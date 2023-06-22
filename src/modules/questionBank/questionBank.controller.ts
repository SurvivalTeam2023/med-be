import { Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles, Unprotected } from "nest-keycloak-connect";
import { USER_CLIENT_ROLE } from "src/common/enums/userClientRole.enum";
import { USER_REALM_ROLE } from "src/common/enums/userRealmRole.enum";
import { RequestPayload } from "src/decorator/requestPayload.decorator";
import { QuestionBankEntity } from "./entities/questionBank.entity";
import QuestionBankService from "./questionBank.service";

@ApiTags('Question Banks')
@Controller('questionBank')
@ApiBearerAuth()
export default class QuestionBankController {
    constructor(private readonly questionBankService: QuestionBankService) { }

    @Unprotected()
    @Post()
    @ApiOperation({ summary: 'create questionBank for user ' })
    async createQuestionBank(@RequestPayload() token: string,
    ): Promise<QuestionBankEntity> {
        return this.questionBankService.createQuestionBank(token);
    }

    @ApiOperation({ summary: 'Is question bank valid ?' })
    @Get()
    @Unprotected()
    async isLastQuizValid(
        @RequestPayload() token: string,
    ): Promise<{ isValid: boolean }> {
        const result = await this.questionBankService.isLastQuizValid(token);
        return { isValid: result.isValid };
    }

    @Roles({ roles: [USER_CLIENT_ROLE.USER] })
    @ApiOperation({ summary: 'set finish for questionBank for user ' })
    @Patch(":id")
    async updateIsFinished(@Param('id') id: number): Promise<QuestionBankEntity> {
        return this.questionBankService.updateIsFinished(id)
    }
}