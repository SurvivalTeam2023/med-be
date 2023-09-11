import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ERROR_MESSAGE } from "src/common/constants/messages.constant";
import { MentalHealthStatus } from "src/common/enums/mentalHealth.enum";

import { ErrorHelper } from "src/helpers/error.helper";
import { EntityManager, In, Repository } from "typeorm";
import CreateMentalHealthDTO from "./dto/createMentalHealth.dto";
import FindMentalHealthDTO from "./dto/findMentalHealth.dto";
import UpdateMentalHealthDTO from "./dto/updateMentalHealth.dto";
import { MentalHealthEntity } from "./entities/mentalHealth.entity";
import { MentalHealthDegreeLogEntity } from "../mentalHealthDegreeLog/entities/mentalHealthDegreeLog.entity";
import { getUserId } from "src/utils/decode.utils";
import UserEntity from "../user/entities/user.entity";
import ChooseMentalDTO from "./dto/chooseMental.dto";


@Injectable()
export default class MentalHealthService {
    constructor(
        private readonly entityManage: EntityManager,

        @InjectRepository(MentalHealthEntity)
        private mentalHealthRepo: Repository<MentalHealthEntity>,
    ) { }
    async findMentalHealthById(
        mentalHealthId: number,
    ): Promise<MentalHealthEntity> {
        const mentalHealth = await this.mentalHealthRepo
            .createQueryBuilder('mental_health')
            .leftJoinAndSelect('mental_health.prompt', 'prompt')
            .where('mental_health.id = :mentalHealthId', { mentalHealthId })
            .select(['mental_health', 'prompt.name'])
            .getOne();
        if (!mentalHealth) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.MENTAL_HEALTH.NOT_FOUND);
        }
        return mentalHealth;
    }

    async findMentalHealth(dto: FindMentalHealthDTO): Promise<MentalHealthEntity[]> {
        const queryBuilder = await this.mentalHealthRepo.createQueryBuilder('mental_health')
        if (dto.name) { queryBuilder.where('LOWER(mental_health.name) like :name', { name: `%${dto.name}%` }).orderBy('mental_health.name', 'ASC').getMany() }
        if (dto.status) { queryBuilder.andWhere('mental_health.status = :status', { status: dto.status }).orderBy('mental_health.name', 'ASC').getMany() }
        return queryBuilder.orderBy('mental_health.name', 'ASC').getMany()
    }

    async createMentalHealth(dto: CreateMentalHealthDTO): Promise<MentalHealthEntity> {

        const mentalHealth = this.mentalHealthRepo.save({
            ...dto
        });
        return mentalHealth;
    }

    async updateMentalHealth(dto: UpdateMentalHealthDTO, mentalHealthId: number): Promise<MentalHealthEntity> {
        const mentalHealth = await this.findMentalHealthById(mentalHealthId)
        const updateMentalHealth = this.mentalHealthRepo.save({
            id: mentalHealth.id,
            ...dto
        });
        return updateMentalHealth;
    }

    async deleteMentalHealth(mentalHealthId: number): Promise<MentalHealthEntity> {
        const mentalHealth = await this.findMentalHealthById(mentalHealthId)
        mentalHealth.status = MentalHealthStatus.INACTIVE;
        await this.mentalHealthRepo.save(mentalHealth);
        return mentalHealth;
    }
    async chooseMental(
        dto: ChooseMentalDTO,
        token: string,
    ): Promise<MentalHealthDegreeLogEntity[]> {
        let userId = getUserId(token);
        const user = await this.entityManage.findOne(UserEntity, {
            where: { id: userId },
        });
        if (!user) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.USER.NOT_FOUND);
        }
        const mentalHealth = await this.entityManage.find(MentalHealthEntity, {
            where: { id: In(dto.mentalHealthId) },
        });
        if (!mentalHealth) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.GENRE.NOT_FOUND);
        }



        const favorites: MentalHealthDegreeLogEntity[] = [];
        for (const m of mentalHealth) {
            const mentalHealthUser = await this.entityManage.create(MentalHealthDegreeLogEntity, {
                userId: userId,
                mentalHealthId: m.id
            })
            await this.entityManage.save(mentalHealthUser)
            favorites.push(mentalHealthUser);
        }
        return favorites;
    }

}