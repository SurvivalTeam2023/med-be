import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags, } from "@nestjs/swagger";
import AgeService from "./age.service";
import { Roles, Unprotected } from "nest-keycloak-connect";
import { USER_CLIENT_ROLE } from "src/common/enums/userClientRole.enum";

@ApiTags('Age')
@Controller('age')
@ApiBearerAuth()
export default class AgeController {
    constructor(private readonly ageService: AgeService) { }


    @Get()
    @Unprotected()
    @ApiOperation({ operationId: 'getAgeCount', summary: 'count group of age' })
    async getAudioById(): Promise<any> {
        return this.ageService.getAgeLog();
    }


}
