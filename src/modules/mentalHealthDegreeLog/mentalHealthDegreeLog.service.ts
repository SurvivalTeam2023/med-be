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
    ): Promise<MentalHealthDegreeLogEntity[]> {
        const userId = getUserId(token)
        const mentalHealth = await this.mentalHealthRepo
            .createQueryBuilder('mental_health_degree_log')
            .innerJoinAndMapOne('mental_health_degree_log.mentalHealth', MentalHealthEntity, 'mentalHealth', 'mentalHealth.id=mental_health_degree_log.mental_health_id')
            .select(['mental_health_degree_log.id', 'mentalHealth'])
            .where('mental_health_degree_log.user_id = :userId', { userId: userId })
            .getMany()
        if (!mentalHealth) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.MENTAL_HEALTH.NOT_FOUND);
        }
        return mentalHealth;
    }
}