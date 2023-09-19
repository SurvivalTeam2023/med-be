import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import PromptService from "./prompt.services";
import { Roles, Unprotected } from "nest-keycloak-connect";
import { PromptEntity } from "./entities/prompt.entity";
import { USER_CLIENT_ROLE } from "src/common/enums/userClientRole.enum";
import ChatBoxDto from "./dto/chatBox.dto";

@ApiTags('Prompt')
@Controller('prompt')
@ApiBearerAuth()
export default class PromptController {
    constructor(private readonly promptService: PromptService) { }

    @Get()
    @Unprotected()
    @ApiOperation({ summary: 'get prompt list ' })

    async findPrompt(): Promise<PromptEntity[]> {
        return this.promptService.findPrompt();
    }

    @Post()
    @Unprotected()
    @ApiOperation({ summary: 'generate text ' })
    async generateText(@Body() prompt: ChatBoxDto): Promise<string> {
        return this.promptService.generateText(prompt.input);
    }
}