import { Body, Controller, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles, Unprotected } from "nest-keycloak-connect";
import { USER_CLIENT_ROLE } from "src/common/enums/userClientRole.enum";
import { USER_REALM_ROLE } from "src/common/enums/userRealmRole.enum";
import { QuestionBankEntity } from "./entities/questionBank.entity";
import QuestionBankService from "./questionBank.service";

@ApiTags('Question Banks')
@Controller('questionBank')
@ApiBearerAuth()
export default class QuestionBankController {
    constructor(private readonly questionBankService: QuestionBankService) { }

    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN, USER_CLIENT_ROLE.USER, USER_REALM_ROLE.APP_ADMIN, USER_REALM_ROLE.APP_USER] })
    @Post()
    async createQuestionBank(
    ): Promise<QuestionBankEntity> {
        return this.questionBankService.createQuestionBank();
    }
}