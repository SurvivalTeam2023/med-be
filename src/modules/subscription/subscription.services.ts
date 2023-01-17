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
import { SubscriptionTypeEntity } from '../subscriptionType/entities/subscriptionType.entity';
import { SubscriptionStatus } from 'src/common/enums/subscriptionStatus.enum';
import * as moment from 'moment';
import UpdateSubscriptionDTO from './dto/updateSubscription.dto';
@Injectable()
export default class SubscriptionService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepo: Repository<SubscriptionEntity>,
    private readonly entityManage: EntityManager,
  ) { }

  async findSubscriptionById(
    subscriptionId: number,
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
    if (dto.subscriptionTypeId) querybuilder.andWhere('subscription.subscription_type_id = :subscriptionTypeId', {
      subscriptionTypeId: dto.subscriptionTypeId,
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
    const user = await this.entityManage.findOne(UserEntity, {
      where: { id: dto.userId },
    });
    if (!user) {
      ErrorHelper.NotFoundExeption(ERROR_MESSAGE.USER.NOT_FOUND);
    }
    const subscriptionType = await this.entityManage.findOne(
      SubscriptionTypeEntity,
      { where: { id: dto.subcriptionTypeId } },
    );
    if (!subscriptionType) {
      ErrorHelper.NotFoundExeption(ERROR_MESSAGE.SUBSCRIPTION_TYPE.NOT_FOUND);
    }
    const subscription = await this.subscriptionRepo.save({
      ...dto,
      user: user,
      subscriptionType: subscriptionType,
    });
    const endDate = moment(subscription.createdAt).add(subscriptionType.usageTime, "M").format()
    await this.subscriptionRepo.save({
      id: subscription.id,
      endDate: endDate
    });
    return subscription;
  }
  async updateSubscription(
    subscriptionId: number,
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

  async deleteSubscription(
    subscriptionId: number,
  ): Promise<SubscriptionEntity> {
    const subscription = await this.subscriptionRepo.findOne({
      where: { id: subscriptionId },
    });
    if (subscription) {
      subscription.status = SubscriptionStatus.INACTIVE;
      await this.subscriptionRepo.save(subscription);
    }
    return subscription;
  }
}
