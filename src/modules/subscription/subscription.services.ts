import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { ErrorHelper } from 'src/helpers/error.helper';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { SubscriptionEntity } from './entities/subscription.entity';
import { SearchSubscriptionDTO } from './dto/searchSubscription.dto';
import CreateSubscriptionDTO from './dto/createSubscription.dto';
import UserEntity from '../user/entities/user.entity';
import { SubscriptionStatus } from 'src/common/enums/subscriptionStatus.enum';
import * as moment from 'moment';
import UpdateSubscriptionDTO from './dto/updateSubscription.dto';
import { PlanEntity } from '../plan/entities/plan.entity';
import { lastValueFrom, map, Observable, firstValueFrom, catchError, of } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AuthService } from '../auth/auth.services';
import { PAYPAL_URL } from 'src/environments';
import { AxiosResponse } from 'axios';
import { getUserId } from 'src/utils/decode.utils';
import { Cron } from '@nestjs/schedule';
import { CronExpression } from '@nestjs/schedule/dist';
import { UserService } from '../user/user.services';
import { USER_CLIENT_ROLE } from 'src/common/enums/userClientRole.enum';
import { USER_REALM_ROLE } from 'src/common/enums/userRealmRole.enum';
import { findValueByKey } from 'src/utils/parseJSON.utils';
@Injectable()
export default class SubscriptionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepo: Repository<SubscriptionEntity>,
    private readonly entityManage: EntityManager,
  ) { }

  async findSubscriptionById(
    subscriptionId: string,
  ): Promise<SubscriptionEntity> {
    const subscription = await this.subscriptionRepo
      .createQueryBuilder('subscription')
      .leftJoinAndSelect('subscription.user', 'user')
      .where('subscription.id = :subscriptionId', { subscriptionId })
      .getOne();
    if (!subscription) {
      ErrorHelper.NotFoundException(ERROR_MESSAGE.SUBSCRIPTION.NOT_FOUND);
    }
    return subscription;
  }
  async findSubscriptions(
    dto: SearchSubscriptionDTO,
    option: IPaginationOptions,
  ): Promise<Pagination<SubscriptionEntity>> {
    const queryBuilder = this.subscriptionRepo
      .createQueryBuilder('subscription')
      .leftJoinAndSelect('subscription.user', 'user')
      .leftJoinAndSelect('subscription.plan', 'plan')
    if (dto.userId) queryBuilder.where('subscription.user_id like :userId', { userId: dto.userId })
    if (dto.status) queryBuilder.andWhere('subscription.status = :subscriptionStatus', {
      subscriptionStatus: dto.status,
    })
    if (dto.planId) queryBuilder.andWhere('subscription.plan_id = :planId', {
      planId: dto.planId,
    })
    if (dto.startDate) queryBuilder.andWhere('subscription.startDate = :startDate', {
      startDate: dto.startDate,
    })
    if (dto.endDate) queryBuilder.andWhere('subscription.endDate = :endDate', { endDate: dto.endDate })

    return paginate<SubscriptionEntity>(queryBuilder.orderBy('subscription.created_at', 'DESC'), option);
  }

  async createSubscription(
    dto: CreateSubscriptionDTO, userToken: string
  ): Promise<Observable<AxiosResponse<[]>>> {
    const response = await lastValueFrom(
      this.authService.getPayPalAccessToken(),
    );
    let token = `Bearer ${response['access_token']}`;
    let userId = getUserId(userToken);
    const user = await this.entityManage.findOne(UserEntity, {
      where: { id: userId },
    });
    if (!user) {
      ErrorHelper.NotFoundException(ERROR_MESSAGE.USER.NOT_FOUND);
    }
    const plan = await this.entityManage.findOne(
      PlanEntity,
      { where: { id: dto.planId } },
    );
    if (!plan) {
      ErrorHelper.NotFoundException(ERROR_MESSAGE.PLAN.NOT_FOUND);
    }
    const subscriptionPaypal = await firstValueFrom(
      this.httpService.post(
        `https://api-m.sandbox.paypal.com/v1/billing/subscriptions`,
        {
          plan_id: dto.planId,
          subscriber: {
            name: {
              given_name: user.firstName,
              surname: user.lastName
            },
            email_address: user.email
          },
          application_context: {
            brand_name: "Med",
            locale: "en-US",
            user_action: "SUBSCRIBE_NOW",
            payment_method: {
              payer_selected: "PAYPAL",
              payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED"
            }
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          }
        }
      )
        .pipe(map((response) => response.data))
    ).catch((err) => {
      ErrorHelper.BadRequestException(err.response.data.errorMessage);
    });
    const startTime = findValueByKey(subscriptionPaypal, 'create_time');
    const endDate = moment(startTime).add(plan.usageTime, "M").toDate()
    await this.subscriptionRepo.save({
      id: subscriptionPaypal['id'],
      user: user,
      status: SubscriptionStatus.APPROVAL_PENDING,
      plan: plan,
      endDate: endDate
    })
    await firstValueFrom(await this.userService.assignRole(user.username, USER_REALM_ROLE.APP_SUBSCRIBER))
    return subscriptionPaypal;
  }
  @Cron(CronExpression.EVERY_5_MINUTES)
  async handlePendingStatusCron() {
    const subList = await this.subscriptionRepo.find(
      { where: { status: SubscriptionStatus.APPROVAL_PENDING } }
    )
    const response = await lastValueFrom(
      this.authService.getPayPalAccessToken(),
    );
    let token = `Bearer ${response['access_token']}`;
    subList.map(async sub => {
      const subPayPal = await lastValueFrom(this.httpService.get(`https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${sub.id}`,
        {
          headers: {
            Authorization: token,
          }
        }
      )
        .pipe(map((response) => response.data))
      )
      const nextBillingTime = findValueByKey(subPayPal, 'next_billing_time');
      if (subPayPal['status'] == SubscriptionStatus.ACTIVE) {
        sub.status = SubscriptionStatus.ACTIVE
        sub.endDate = moment(nextBillingTime).toDate()
        await this.subscriptionRepo.save(sub)

      }
      else if (subPayPal['status'] == SubscriptionStatus.APPROVAL_PENDING || !subPayPal) {
        sub.status = SubscriptionStatus.EXPIRED
        await this.subscriptionRepo.save(sub)
      }
    })
  }
  @Cron(CronExpression.EVERY_HOUR)
  async handleActiveStatusCron() {
    const subList = await this.subscriptionRepo.find(
      { where: { status: SubscriptionStatus.ACTIVE } }
    )
    const response = await lastValueFrom(
      this.authService.getPayPalAccessToken(),
    );
    let token = `Bearer ${response['access_token']}`;
    subList.map(async sub => {
      const subPayPal = await lastValueFrom(this.httpService.get(`https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${sub.id}`,
        {
          headers: {
            Authorization: token,
          }
        }
      )
        .pipe(map((response) => response.data))
      )
      const nextBillingTime = findValueByKey(subPayPal, 'next_billing_time');
      if (subPayPal['status'] == SubscriptionStatus.ACTIVE) {
        sub.endDate = moment(nextBillingTime).toDate()
        await this.subscriptionRepo.save(sub)
      }
      else if (subPayPal['status'] == SubscriptionStatus.SUSPENDED) {
        sub.status = SubscriptionStatus.SUSPENDED
        await this.subscriptionRepo.save(sub)
      }
      else if (subPayPal['status'] == SubscriptionStatus.CANCELLED) {
        sub.status = SubscriptionStatus.CANCELLED
        await this.subscriptionRepo.save(sub)
      } else if (!subPayPal) {
        sub.status = SubscriptionStatus.EXPIRED
        await this.subscriptionRepo.save(sub)
      }
    })
  }


  async activateSubscription(subscriptionId: string, userToken: string): Promise<SubscriptionEntity[]> {
    let userId = getUserId(userToken);
    const response = await lastValueFrom(
      this.authService.getPayPalAccessToken(),
    );
    const sub = await this.subscriptionRepo.findOne(
      {
        where: {
          id: subscriptionId
        }
      })
    let adminToken = `Bearer ${response['access_token']}`;

    const subPayPal = await lastValueFrom(this.httpService.get(`https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${sub.id}`,
      {
        headers: {
          Authorization: adminToken,
        }
      }
    )
      .pipe(map((response) => response.data))
    )
    const nextBillingTime = findValueByKey(subPayPal, 'next_billing_time');
    if (subPayPal['status'] == SubscriptionStatus.ACTIVE) {
      sub.status = SubscriptionStatus.ACTIVE
      sub.endDate = moment(nextBillingTime).toDate()
      await this.subscriptionRepo.save(sub)
      const subList = await this.subscriptionRepo.createQueryBuilder('subscription')
        .leftJoinAndSelect('subscription.plan', 'plan')
        .where('subscription.user_id like :userId', { userId: userId })
        .orderBy('subscription.created_at', 'DESC').getMany()
      return subList
    } else {
      ErrorHelper.UnprocessableEntity(ERROR_MESSAGE.SUBSCRIPTION.NOT_APPROVE);

    }
  }



  async updateSubscription(
    subscriptionId: string,
    dto: UpdateSubscriptionDTO,
  ): Promise<SubscriptionEntity> {
    const subscription = await this.findSubscriptionById(subscriptionId);
    if (!subscription)
      ErrorHelper.NotFoundException(ERROR_MESSAGE.SUBSCRIPTION.NOT_FOUND);
    const updatedSubscription = await this.subscriptionRepo.save({
      id: subscription.id,
      ...dto,
    });
    return updatedSubscription;
  }

  async suspendSubscription(
    subscriptionId: string,
  ): Promise<SubscriptionEntity> {
    const subscription = await this.subscriptionRepo.findOne({
      where: { id: subscriptionId },
    });
    if (!subscription) {
      ErrorHelper.NotFoundException(ERROR_MESSAGE.SUBSCRIPTION.NOT_FOUND);
    }
    const response = await lastValueFrom(
      this.authService.getPayPalAccessToken(),
    );
    let token = `Bearer ${response['access_token']}`;
    await lastValueFrom(this.httpService.post(
      `${PAYPAL_URL}/v1/billing/subscriptions/${subscriptionId}/suspend`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        }
      }
    ).pipe(map((response) => response.data)),
    ).catch((err) => {
      ErrorHelper.BadRequestException(err.response.data.errorMessage);
    });
    subscription.status = SubscriptionStatus.SUSPENDED;
    await this.subscriptionRepo.save(subscription);

    return subscription;
  }

  async getSubscriptionByUserId(token: string): Promise<SubscriptionEntity[]> {
    const userId = getUserId(token)
    const subList = await this.subscriptionRepo.find(
      {
        where: {
          user: {
            id: userId
          },
          status: In([SubscriptionStatus.ACTIVE, SubscriptionStatus.APPROVAL_PENDING])
        }
      }
    )
    const response = await lastValueFrom(
      this.authService.getPayPalAccessToken(),
    );
    let adminToken = `Bearer ${response['access_token']}`;
    const updateSub = await Promise.all(subList.map(async sub => {
      const subPayPal = await lastValueFrom(this.httpService.get(`https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${sub.id}`,
        {
          headers: {
            Authorization: adminToken,
          }
        }
      )
        .pipe(map((response) => response.data),
          catchError((err) =>
            of(
              ErrorHelper.BadGatewayException(err.response.data),
            ),
          ),
        )

      )
      const status = findValueByKey(subPayPal, 'status')

      if (status == SubscriptionStatus.ACTIVE) {
        sub.status = SubscriptionStatus.ACTIVE
        await this.subscriptionRepo.save(sub)
      }
      return sub
    }))
    return updateSub
  }

  async countUserSubscribe(): Promise<number> {
    const total = await this.subscriptionRepo
      .createQueryBuilder('subscription')
      .select('DISTINCT  subscription.user_id')
      .getRawMany()

    return total.length
  }
}
