/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserStatusLogEntity } from "./entity/userStatusLog.entity";
import UserLogController from "./userStatusLog.controller";
import { UserLogService } from "./userStatusLog.service";


@Module({
    imports: [TypeOrmModule.forFeature([UserStatusLogEntity])],
    controllers: [UserLogController],
    providers: [UserLogService],
})
export class UserLogModule { }
