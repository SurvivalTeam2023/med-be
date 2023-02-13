import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ERROR_MESSAGE } from "src/common/constants/messages.constant";
import { MentalHealthStatus } from "src/common/enums/mentalHealth.enum";
import { ErrorHelper } from "src/helpers/error.helper";
import { EntityManager, Repository } from "typeorm";
import { MentalHealthEntity } from "../mentalHealth/entities/mentalHealth.entity";
import CreateMentalHealthDegreeDTO from "./dto/createMentalHealthDegree.dto";
import FindMentalHealthDegreeDTO from "./dto/findMentalHealthDegree.dto";
import UpdateMentalHealthDegreeDTO from "./dto/updateMentalHealthDegree.dto";
import { MentalHealthDegreeEntity } from "./entities/mentalHealthDegree.entity";

@Injectable()
export default class MentalHealthDegreeService {
    constructor(
        @InjectRepository(MentalHealthDegreeEntity)
        private mentalHealthDegreeRepo: Repository<MentalHealthDegreeEntity>,
        private readonly entityManage: EntityManager,
    ) { }
    async findMentalHealthDegreeById(
        mentalHealthDegreeId: number,
    ): Promise<MentalHealthDegreeEntity> {
        const mentalHealthDegree = await this.mentalHealthDegreeRepo
            .createQueryBuilder('mental_health_degree')
            .where('mental_health_degree.id = :mentalHealthDegreeId', { mentalHealthDegreeId })
            .getOne();
        if (!mentalHealthDegree) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.MENTAL_HEALTH_DEGREE.NOT_FOUND);
        }
        return mentalHealthDegree;
    }

    async findMentalHealthDegree(
        dto: FindMentalHealthDegreeDTO,
    ): Promise<MentalHealthDegreeEntity[]> {
        const queryBuilder = this.mentalHealthDegreeRepo
            .createQueryBuilder('mental_health_degree')
        if (dto.title) queryBuilder.where('LOWER(mental_health_degree.question) like :title', { title: `%${dto.title}%` }).orderBy('mental_health_degree.created_at', 'DESC')

        if (dto.status) queryBuilder.andWhere('mental_health_degree.status = :status', { status: dto.status }).orderBy('mental_health_degree.created_at', 'DESC')

        return queryBuilder.orderBy('mental_health_degree.created_at', 'DESC').getMany()
    }
    async createMentalHealthDegree(dto: CreateMentalHealthDegreeDTO): Promise<MentalHealthDegreeEntity> {
        const mentalHealth = await this.entityManage.findOne(MentalHealthEntity, {
            where: { id: dto.mentalHealthId },
        });
        if (!mentalHealth) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.MENTAL_HEALTH_DEGREE.NOT_FOUND)
        }
        const mentalHealthDegree = this.mentalHealthDegreeRepo.save({
            ...dto,
            mentalHealthId: mentalHealth
        });
        return mentalHealthDegree;
    }

    async updateMentalHealthDegree(
        mentalHealthDegreeId: number,
        dto: UpdateMentalHealthDegreeDTO,
    ): Promise<MentalHealthDegreeEntity> {
        const mentalHealthDegree = await this.findMentalHealthDegreeById(mentalHealthDegreeId)


        const updatedMentalHealthDegree = await this.mentalHealthDegreeRepo.save({
            id: mentalHealthDegree.id,
            ...dto,
        });
        return updatedMentalHealthDegree;
    }

    async deleteMentalHealthDegree(mentalHealthDegreeId: number): Promise<MentalHealthDegreeEntity> {
        const mentalHealthDegree = await this.findMentalHealthDegreeById(mentalHealthDegreeId)
        mentalHealthDegree.status = MentalHealthStatus.INACTIVE;
        await this.mentalHealthDegreeRepo.save(mentalHealthDegree);

        return mentalHealthDegree;
    }
}