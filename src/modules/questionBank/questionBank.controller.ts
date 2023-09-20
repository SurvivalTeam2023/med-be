import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles, Unprotected } from "nest-keycloak-connect";
import { USER_CLIENT_ROLE } from "src/common/enums/userClientRole.enum";
import { USER_REALM_ROLE } from "src/common/enums/userRealmRole.enum";
import { RequestPayload } from "src/decorator/requestPayload.decorator";
import { QuestionBankEntity } from "./entities/questionBank.entity";
import QuestionBankService from "./questionBank.service";
import CreateQuestionBankDto from "./dto/createQuestionBank.dto";

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

    @Post('mentalHealth')
    @Unprotected()
    @ApiOperation({ summary: 'create questionBank for user by mental health ' })
    async createQuestionBankByMentalHealth(@RequestPayload() token: string, @Body() dto: CreateQuestionBankDto
    ): Promise<QuestionBankEntity> {
        return this.questionBankService.createQuestionBankByMentalHealth(token, dto);
    }

    @ApiOperation({ summary: 'Is question bank valid ?' })
    @Get()
    @Unprotected()
    async isLastQuizValid(
        @RequestPayload() token: string,
    ): Promise<boolean> {
        return await this.questionBankService.isLastQuizValid(token);

    }

    @Roles({ roles: [USER_CLIENT_ROLE.USER] })
    @ApiOperation({ summary: 'set finish for questionBank for user ' })
    @Patch(":id")
    async updateIsFinished(@Param('id') id: number): Promise<QuestionBankEntity> {
        return this.questionBankService.updateIsFinished(id)
    }

    @ApiOperation({ summary: 'Get question bank by user' })
    @Get('user')
    @Unprotected()
    async getQuestionBankByUser(
        @RequestPayload() token: string,
    ): Promise<QuestionBankEntity[]> {
        return await this.questionBankService.getQuestionBankByUser(token);

    }
}