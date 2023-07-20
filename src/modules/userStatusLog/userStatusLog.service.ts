import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import * as moment from "moment";
import { USER_STATUS } from "src/common/enums/userStatus.enum";
import { EntityManager, Repository } from "typeorm";
import UserEntity from "../user/entities/user.entity";
import { UserStatusLogEntity } from "./entity/userStatusLog.entity";

@Injectable()
export class UserLogService {
    constructor(
        private readonly entityManage: EntityManager,
        @InjectRepository(UserStatusLogEntity)
        private readonly userLogRepo: Repository<UserStatusLogEntity>,
    ) { }

    @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
    async countUserStatus(): Promise<UserStatusLogEntity> {
        const month = moment().month()
        const isActive = await this.entityManage
            .createQueryBuilder()
            .select()
            .from(UserEntity, "user")
            .where("MONTH(last_updated_at) =:month", { month: month })
            .andWhere("user.status = :ACTIVE", { ACTIVE: USER_STATUS.ACTIVE })
            .getCount()

        const isInactive = await this.entityManage
            .createQueryBuilder()
            .select()
            .from(UserEntity, "user")
            .where("MONTH(last_updated_at) =:month", { month: month })
            .andWhere("user.status = :INACTIVE", { INACTIVE: USER_STATUS.INACTIVE })
            .getCount()

        const statusLog = await this.userLogRepo.save({
            month: month,
            isActive: isActive,
            isInactive: isInactive,
        })
        return statusLog
    }

    async getCountUser(): Promise<UserStatusLogEntity[]> {
        return await this.userLogRepo.find()
    }
}