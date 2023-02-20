import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QuestionEntity } from "src/modules/question/entities/question.entity";
import { QuestionBankQuestionEntity } from "src/modules/questionBankQuestion/entities/questionBankQuestion.entity";
import { EntityManager, Repository } from "typeorm";
import { QuestionBankEntity } from "./entities/questionBank.entity";

@Injectable()
export default class QuestionBankService {
    constructor(
        private readonly entityManage: EntityManager,
        @InjectRepository(QuestionBankEntity)
        private questionBankRepo: Repository<QuestionBankEntity>,

    ) { }

    async createQuestionBank(): Promise<QuestionBankEntity> {
        const questions = await this.entityManage
            .createQueryBuilder()
            .from(QuestionEntity, 'question')
            .leftJoinAndSelect('question.option', 'option')
            .select(['question.id', 'question.question','question.status', 'option.id', 'option.option'])
            .where("question.status = 'ACTIVE'")
            .orderBy('RAND()')
            .take(50)
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
            }
        )
        return questionBank;
    }

}