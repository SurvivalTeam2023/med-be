import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles, Unprotected } from "nest-keycloak-connect";
import { USER_CLIENT_ROLE } from "src/common/enums/userClientRole.enum";
import PromptDetailService from "./promptDetail.service";
import { PromptDetailEntity } from "./entities/promptDetail.entity";

@ApiTags('PromptDetail')
@Controller('prompt')
@ApiBearerAuth()
export default class PromptDetailController {
    constructor(private readonly promptService: PromptDetailService) { }

    @Get()
    @Roles({ roles: [USER_CLIENT_ROLE.SUBSCRIBER] })
    @ApiOperation({ summary: 'get prompt detail ' })

    async findPrompt(): Promise<PromptDetailEntity[]> {
        return this.promptService.findPrompt();
    }
}