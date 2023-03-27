import { Controller, Get, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Unprotected } from "nest-keycloak-connect";
import { UserStatusLogEntity } from "./entity/userStatusLog.entity";
import { UserLogService } from "./userStatusLog.service";

@ApiTags('UserLog')
@Controller('userLog')
@ApiBearerAuth()
export default class UserLogController {
    constructor(private readonly userLogService: UserLogService) { }


    @Get()
    @Unprotected()
    async getUserStatusCount(

    ): Promise<UserStatusLogEntity> {
        return this.userLogService.countUserStatus();
    }
}