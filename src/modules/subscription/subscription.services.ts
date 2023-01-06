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
import UpdateSubcriptionDTO from './dto/updateSubscription.dto';
import { SubscriptionTypeEntity } from '../subscriptionType/entities/subscriptionType.entity';
import { SubscriptionStatus } from 'src/common/enums/subscriptionStatus.enum';
import * as moment from 'moment';
@Injectable()
export default class SubscriptionService {
    constructor(
        @InjectRepository(SubscriptionEntity)
        private subscriptionRepo: Repository<SubscriptionEntity>,
        private readonly entityManage: EntityManager,

    ) { }

    async findSubscriptionById(subscriptionId: number): Promise<SubscriptionEntity> {
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
            .orWhere('subscription.user_id like :userId', { userId: dto.userId })
            .orWhere('subscription.status = :subscriptionStatus', { subscriptionStatus: dto.status })
            .orWhere('subscription.subcription_type_id = :subcriptionTypeId', { subscriptionTypeId: dto.subscriptionTypeId })
            .orWhere('subscription.startDate = :startDate', { startDate: dto.startDate })
            .orWhere('subscription.endDate = :endDate', { endDate: dto.endDate })
            .orderBy('subscription.created_at', 'DESC');

        return paginate<SubscriptionEntity>(querybuilder, option);
    }

    async createSubscription(dto: CreateSubcriptionDTO): Promise<SubscriptionEntity> {
        const user = await this.entityManage.findOne(UserEntity, { where: { id: dto.userId } })
        if (!user) {
            ErrorHelper.NotFoundExeption(ERROR_MESSAGE.USER.NOT_FOUND);
        }
        const subscriptionType = await this.entityManage.findOne(SubscriptionTypeEntity, { where: { id: dto.subcriptionTypeId } })
        if (!subscriptionType) {
            ErrorHelper.NotFoundExeption(ERROR_MESSAGE.SUBSCRIPTION_TYPE.NOT_FOUND);
        }
        const startDate = moment(dto.startDate)
        const endDate = moment(dto.endDate)
        if (endDate.isBefore(startDate)) {
            ErrorHelper.BadRequestException(ERROR_MESSAGE.SUBSCRIPTION.END_DATE_INVALID);
        }
        const subscription = await this.subscriptionRepo.save({
            ...dto,
            user: user,
            subscriptionType: subscriptionType,

        });
        return subscription;
    }
    async updateSubscription(subscriptionId: number, dto: UpdateSubcriptionDTO): Promise<SubscriptionEntity> {
        const subscription = await this.findSubscriptionById(subscriptionId)
        if (!subscription) ErrorHelper.NotFoundExeption(ERROR_MESSAGE.SUBSCRIPTION.NOT_FOUND);

        const updatedSubcription = await this.subscriptionRepo.save({
            id: subscription.id,
            ...dto,
        });
        return updatedSubcription;
    }

    async deleteSubscription(subscriptionId: number): Promise<SubscriptionEntity> {
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
