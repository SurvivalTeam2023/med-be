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
            ErrorHelper.NotFoundExeption(ERROR_MESSAGE.Subcription.NOT_FOUND);
        }
        return subcription;
    }
    async findSubcriptions(
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

    async createSubcription(dto: CreateSubcriptionDTO): Promise<SubscriptionEntity> {
        const user = await this.entityManage.findOne(UserEntity, { where: { id: dto.userId } })
        const subcriptionType = await this.entityManage.findOne(SubscriptionTypeEntity, { where: { id: dto.subcriptionTypeId } })
        const entity = await this.subscriptionRepo.save({
            ...dto,
            userId: user,
            subcriptionTypeId: subcriptionType,
        });
        return entity;
    }
    async updateSubscription(subscriptionId: number, dto: UpdateSubcriptionDTO): Promise<SubscriptionEntity> {
        const subcription = await this.findSubscriptionById(subscriptionId)
        if (!subcription) ErrorHelper.NotFoundExeption(ERROR_MESSAGE.AUDIO.NOT_FOUND);

        const updatedSubcription = await this.subscriptionRepo.save({
            id: subcription.id,
            ...dto,
        });
        return updatedSubcription;
    }

    async deleteSubscription(subscriptionId: number): Promise<SubscriptionEntity> {
        const entity = await this.subscriptionRepo.findOne({
            where: { id: subscriptionId },
        });
        if (entity) {
            entity.status = SubscriptionStatus.INACTIVE;
            await this.subscriptionRepo.save(entity);
        }
        return entity;
    }
}
