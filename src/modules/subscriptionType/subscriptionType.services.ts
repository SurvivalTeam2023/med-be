/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHelper } from 'src/helpers/error.helper';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import { SubscriptionTypeEntity } from '../subscriptionType/entities/subscriptionType.entity';
import { Repository } from 'typeorm';
import CreateSubscriptionTypeDTO from './dto/createSubscriptionType.dto';
import UpdateSubscriptionTypeDTO from './dto/updateSubscriptionType.dto';
import { SubscriptionTypeStatus } from 'src/common/enums/subscriptionTypeStatus.enum';
import SearchSubscriptionTypeDTO from './dto/findSubscriptionType.dto';

@Injectable()
export default class SubscriptionTypeService {
  constructor(
    @InjectRepository(SubscriptionTypeEntity)
    private subscriptionTypeRepo: Repository<SubscriptionTypeEntity>,
  ) { }

  async findSubscriptionTypeById(
    subscriptionTypeId: number,
  ): Promise<SubscriptionTypeEntity> {
    const subcription = await this.subscriptionTypeRepo
      .createQueryBuilder('subscription_type')
      .where('subscription_type.id = :subscriptionTypeId', {
        subscriptionTypeId,
      })
      .getOne();
    if (!subcription) {
      ErrorHelper.NotFoundExeption(ERROR_MESSAGE.SUBSCRIPTION_TYPE.NOT_FOUND);
    }
    return subcription;
  }
  async findSubscriptionTypes(dto: SearchSubscriptionTypeDTO): Promise<SubscriptionTypeEntity[]> {
    const querybuilder = this.subscriptionTypeRepo
      .createQueryBuilder('subscription_type')
    console.log(dto.usageTime, "time")
    if (dto.name) querybuilder.where('subscription_type.name like :name', { name: `%${dto.name}%` }).orderBy('subscription_type.created_at', 'DESC')
    if (dto.status) querybuilder.andWhere('subscription_type.status like :status', { status: dto.status }).orderBy('subscription_type.created_at', 'DESC')
    if (dto.usageTime) querybuilder.andWhere('subscription_type.usage_time = :usageTime', { usageTime: dto.usageTime }).orderBy('subscription_type.created_at', 'DESC')

    return querybuilder.getMany();
  }

  async createSubscriptionType(
    dto: CreateSubscriptionTypeDTO,
  ): Promise<SubscriptionTypeEntity> {
    const subcription = await this.subscriptionTypeRepo.save({
      ...dto,
    });
    return subcription;
  }
  async updateSubscriptionType(
    subscriptionTypeId: number,
    dto: UpdateSubscriptionTypeDTO,
  ): Promise<SubscriptionTypeEntity> {
    const subcription = await this.findSubscriptionTypeById(subscriptionTypeId);
    if (!subcription)
      ErrorHelper.NotFoundExeption(ERROR_MESSAGE.SUBSCRIPTION_TYPE.NOT_FOUND);

    const updatedSubcription = await this.subscriptionTypeRepo.save({
      id: subcription.id,
      ...dto,
    });
    return updatedSubcription;
  }

  async deleteSubscriptionType(
    subscriptionTypeId: number,
  ): Promise<SubscriptionTypeEntity> {
    const subsciptionType = await this.findSubscriptionTypeById(
      subscriptionTypeId,
    );
    if (subsciptionType) {
      subsciptionType.status = SubscriptionTypeStatus.EXPIRED;
      await this.subscriptionTypeRepo.save(subsciptionType);
    }
    return subsciptionType;
  }
}
