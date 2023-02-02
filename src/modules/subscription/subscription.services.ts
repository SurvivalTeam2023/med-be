import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ErrorHelper } from 'src/helpers/error.helper';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { SubscriptionEntity } from './entities/subscription.entity';
import { SearchSubscriptionDTO } from './dto/searchSubscription.dto';
import CreateSubcriptionDTO from './dto/createSubscription.dto';
import UserEntity from '../user/entities/user.entity';
import { SubscriptionStatus } from 'src/common/enums/subscriptionStatus.enum';
import * as moment from 'moment';
import UpdateSubscriptionDTO from './dto/updateSubscription.dto';
import { PlanEntity } from '../plan/entities/plan.entity';
import { lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AuthService } from '../auth/auth.services';
import { PAYPAL_URL } from 'src/environments';
@Injectable()
export default class SubscriptionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepo: Repository<SubscriptionEntity>,
    private readonly entityManage: EntityManager,
  ) { }

  async findSubscriptionById(
    subscriptionId: string,
  ): Promise<SubscriptionEntity> {
    const subcription = await this.subscriptionRepo
      .createQueryBuilder('subscription')
      .where('subscription.id = :subscriptionId', { subscriptionId })
      .getOne();
    if (!subcription) {
      ErrorHelper.NotFoundExeption(ERROR_MESSAGE.SUBSCRIPTION.NOT_FOUND);
    }
    return subcription;
  }
  async findSubscriptions(
    dto: SearchSubscriptionDTO,
    option: IPaginationOptions,
  ): Promise<Pagination<SubscriptionEntity>> {
    const querybuilder = this.subscriptionRepo
      .createQueryBuilder('subscription')
    if (dto.userId) querybuilder.where('subscription.user_id like :userId', { userId: dto.userId })
    if (dto.status) querybuilder.andWhere('subscription.status = :subscriptionStatus', {
      subscriptionStatus: dto.status,
    })
    if (dto.planId) querybuilder.andWhere('subscription.plan_id = :subscriptionTypeId', {
      subscriptionTypeId: dto.planId,
    })
    if (dto.startDate) querybuilder.andWhere('subscription.startDate = :startDate', {
      startDate: dto.startDate,
    })
    if (dto.endDate) querybuilder.andWhere('subscription.endDate = :endDate', { endDate: dto.endDate })

    return paginate<SubscriptionEntity>(querybuilder.orderBy('subscription.created_at', 'DESC'), option);
  }

  async createSubscription(
    dto: CreateSubcriptionDTO,
  ): Promise<SubscriptionEntity> {
    const response = await lastValueFrom(
      this.authService.getPayPalAccessToken(),
    );
    let token = `Bearer ${response['access_token']}`;
    const user = await this.entityManage.findOne(UserEntity, {
      where: { id: dto.userId },
    });
    if (!user) {
      ErrorHelper.NotFoundExeption(ERROR_MESSAGE.USER.NOT_FOUND);
    }
    const plan = await this.entityManage.findOne(
      PlanEntity,
      { where: { id: dto.planId } },
    );
    if (!plan) {
      ErrorHelper.NotFoundExeption(ERROR_MESSAGE.PLAN.NOT_FOUND);
    }
    const subscriptionPaypal = await lastValueFrom(
      this.httpService.post(
        `https://api-m.sandbox.paypal.com/v1/billing/subscriptions`,
        {
          plan_id: dto.planId,
          shipping_amount: {
            currency_code: "USD",
            value: plan.cost
          },
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
        .pipe(map((response) => response.data)),
    ).catch((err) => {
      ErrorHelper.BadRequestException(err.response.data.errorMessage);
    });
    const endDate = moment(dto.startDate).add(plan.usageTime, "M").format()
    const subscription = await this.subscriptionRepo.save({
      id: subscriptionPaypal.id,
      ...dto,
      user: user,
      plan: plan,
      endDate: endDate
    });

    return subscription;
  }

  async activateSubscription(subcriptionId: string) {
    await lastValueFrom(
      this.httpService.post(
        `api-m.sandbox.paypal.com/v1/billing/subscriptions/${subcriptionId}d/activate`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer A21AAKaKr5Ukst3BSFA7YUsvFgcq2I1BA07iIGhK1jjEet-Dn0bWvjtU-MQINEcl2a6FvwU9-tup2Ha6HO1eJKxYS9JOJDUMg',
          }
        }
      )
    )
  }
  async updateSubscription(
    subscriptionId: string,
    dto: UpdateSubscriptionDTO,
  ): Promise<SubscriptionEntity> {
    const subscription = await this.findSubscriptionById(subscriptionId);
    if (!subscription)
      ErrorHelper.NotFoundExeption(ERROR_MESSAGE.SUBSCRIPTION.NOT_FOUND);
    const updatedSubcription = await this.subscriptionRepo.save({
      id: subscription.id,
      ...dto,
    });
    return updatedSubcription;
  }

  async suspendSubscription(
    subscriptionId: string,
  ): Promise<SubscriptionEntity> {
    const subscription = await this.subscriptionRepo.findOne({
      where: { id: subscriptionId },
    });
    if (!subscription) {
      ErrorHelper.NotFoundExeption(ERROR_MESSAGE.PLAN.NOT_FOUND);
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
}
