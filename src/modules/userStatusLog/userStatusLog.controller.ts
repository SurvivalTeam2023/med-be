import { Controller, Get, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
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
    @ApiOperation({ summary: 'get total user by status ' })
    async getUserStatusCount(
    ): Promise<UserStatusLogEntity[]> {
        return this.userLogService.getCountUser();
    }
}