import { Controller, Get, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles, Unprotected } from "nest-keycloak-connect";
import { UserStatusLogEntity } from "./entity/userStatusLog.entity";
import { UserLogService } from "./userStatusLog.service";
import { USER_CLIENT_ROLE } from "src/common/enums/userClientRole.enum";

@ApiTags('UserLog')
@Controller('userLog')
@ApiBearerAuth()
export default class UserLogController {
    constructor(private readonly userLogService: UserLogService) { }


    @Get()
    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    @ApiOperation({ summary: 'get total user by status ' })
    async getUserStatusCount(
    ): Promise<UserStatusLogEntity[]> {
        return this.userLogService.getCountUser();
    }
}