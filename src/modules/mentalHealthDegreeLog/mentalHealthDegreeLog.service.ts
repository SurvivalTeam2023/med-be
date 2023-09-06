import { Injectable } from "@nestjs/common";
import { EntityManager, Repository } from "typeorm";
import { MentalHealthDegreeLogEntity } from "./entities/mentalHealthDegreeLog.entity";
import { ErrorHelper } from "src/helpers/error.helper";
import { InjectRepository } from "@nestjs/typeorm";
import { MentalHealthEntity } from "../mentalHealth/entities/mentalHealth.entity";
import { ERROR_MESSAGE } from "src/common/constants/messages.constant";
import { getUserId } from "src/utils/decode.utils";

@Injectable()
export default class MentalHealthDegreeLogService {
    constructor(
        private readonly entityManage: EntityManager,

        @InjectRepository(MentalHealthDegreeLogEntity)
        private mentalHealthRepo: Repository<MentalHealthDegreeLogEntity>,
    ) { }
    async findMentalHealthUser(
        token: string
    ): Promise<MentalHealthEntity[]> {
        const userId = getUserId(token)
        const queryBuilder = this.entityManage.createQueryBuilder(MentalHealthEntity, 'mental_health')
            .innerJoin('mental_health_degree_log', 'degree_log', 'degree_log.mental_health_id = mental_health.id')
            .select('mental_health.name')
            .where('degree_log.user_id = :userId', { userId })
            .getMany()
        if (!queryBuilder) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.MENTAL_HEALTH.NOT_FOUND);
        }
        return queryBuilder;
    }
}