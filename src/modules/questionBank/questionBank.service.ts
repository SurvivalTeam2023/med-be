import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import moment from "moment";
import { ERROR_MESSAGE } from "src/common/constants/messages.constant";
import { ErrorHelper } from "src/helpers/error.helper";
import { QuestionEntity } from "src/modules/question/entities/question.entity";
import { QuestionBankQuestionEntity } from "src/modules/questionBankQuestion/entities/questionBankQuestion.entity";
import { getUserId } from "src/utils/decode.utils";
import { EntityManager, Repository } from "typeorm";
import UserEntity from "../user/entities/user.entity";
import { QuestionBankEntity } from "./entities/questionBank.entity";

@Injectable()
export default class QuestionBankService {
    constructor(
        private readonly entityManage: EntityManager,
        @InjectRepository(QuestionBankEntity)
        private questionBankRepo: Repository<QuestionBankEntity>,

    ) { }

    async createQuestionBank(token: string): Promise<QuestionBankEntity> {
        let userId = getUserId(token);
        const user = await this.entityManage.findOne(UserEntity, {
            where: { id: userId },
        });
        if (!user) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.USER.NOT_FOUND);
        }
        const questions = await this.entityManage
            .createQueryBuilder()
            .from(QuestionEntity, 'question')
            .leftJoinAndSelect('question.option', 'option')
            .select(['question.id', 'question.question', 'question.status', 'option.id', 'option.option'])
            .where("question.status = 'ACTIVE'")
            .andWhere("option.option IS NOT NULL")
            .orderBy('RAND()')
            .take(10)
            .getMany()

        const questionBankQuestions = questions.map((question) => {
            const questionBankQuestion = new QuestionBankQuestionEntity()
            questionBankQuestion.question = question
            return questionBankQuestion

        }

        )

        const questionBank = await this.questionBankRepo.save(
            {
                isFinished: false,
                numberOfQuestion: 50,
                questionBankQuestion: questionBankQuestions,
                userId: user
            }
        )
        return questionBank;
    }
    async isLastQuizValid(token: string): Promise<{ isValid: boolean }> {
        let userId = getUserId(token);
        const questionBankQueryResult = await this.entityManage
            .createQueryBuilder()
            .from(QuestionBankEntity, 'question_bank')
            .select('question_bank')
            .orderBy('created_at', 'DESC')
            .where('user_id = :user_id', { user_id: userId })
            .andWhere('is_finished = true')
            .andWhere('NOW() - created_at > 3')
            .getMany();
        const isValid = questionBankQueryResult.length > 0;
        return { isValid };
    }
    async updateIsFinished(id: number): Promise<QuestionBankEntity> {
        const questionBank = await this.questionBankRepo.findOne({
            where: {
                id: id
            }
        })
        if (!questionBank) ErrorHelper.NotFoundException(ERROR_MESSAGE.QUESTION_BANK.NOT_FOUND);
        if (questionBank.isFinished == true) ErrorHelper.NotFoundException(ERROR_MESSAGE.QUESTION_BANK.IS_FINISHED);

        questionBank.isFinished = true;
        await this.questionBankRepo.save(questionBank)

        return questionBank
    }
}