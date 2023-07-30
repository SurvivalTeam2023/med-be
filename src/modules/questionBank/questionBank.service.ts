import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import moment from "moment";
import { ERROR_MESSAGE } from "src/common/constants/messages.constant";
import { ErrorHelper } from "src/helpers/error.helper";
import { QuestionEntity } from "src/modules/question/entities/question.entity";
import { QuestionBankQuestionEntity } from "src/modules/questionBankQuestion/entities/questionBankQuestion.entity";
import { getUserId } from "src/utils/decode.utils";
import { EntityManager, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import UserEntity from "../user/entities/user.entity";
import { QuestionBankEntity } from "./entities/questionBank.entity";
import { getAge } from "src/utils/getAge.utils";
import { QuestionStatus } from "src/common/enums/questionStatus.enum";
import { ResultEntity } from "../result/entities/result.entity";
import e from "express";
import { MentalHealthEntity } from "../mentalHealth/entities/mentalHealth.entity";
import { AgeEntity } from "../age/entities/age.entity";

@Injectable()
export default class QuestionBankService {
    constructor(
        private readonly entityManage: EntityManager,
        @InjectRepository(QuestionBankEntity)
        private questionBankRepo: Repository<QuestionBankEntity>,

    ) { }

    async getQuestionBankByUser(token: string): Promise<QuestionBankEntity[]> {
        let userId = getUserId(token)
        return await this.questionBankRepo.find({
            where: {
                user: {
                    id: userId
                },
                isFinished: true
            }
        })

    }
    async createQuestionBank(token: string): Promise<QuestionBankEntity> {
        const userId = getUserId(token);

        const user = await this.entityManage.findOne(UserEntity, {
            where: { id: userId },
        });

        if (!user) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.USER.NOT_FOUND);
        }
        let questionBankQuestions: QuestionBankQuestionEntity[] = [];
        const result: QuestionEntity[] = [];
        const age = await this.entityManage.findOne(AgeEntity, {
            where: {
                startAge: LessThanOrEqual(getAge(user.dob)), endAge: MoreThanOrEqual(getAge(user.dob))
            }
        })
        for (let i = 1; i <= 4; i++) {
            const questions = await this.entityManage
                .createQueryBuilder(QuestionEntity, 'question')
                .leftJoinAndSelect('question.option', 'option')
                .leftJoinAndSelect('question.age', 'age')
                .leftJoinAndSelect('question.questionMentalHealth', 'questionMentalHealth')
                .where('age.id = :ageId', { ageId: age.id })
                .andWhere('question.status = :status', { status: QuestionStatus.ACTIVE })
                .andWhere('questionMentalHealth.mentalHealthId = :mentalHealthId', { mentalHealthId: i })
                .select(['question.id', 'question.question', 'option.id', 'option.option', 'questionMentalHealth.mentalHealthId'])
                .orderBy("RAND()")
                .take(10)
                .getMany();
            result.push(...questions);
        }

        questionBankQuestions = result.map((question) => {
            const questionBankQuestion = new QuestionBankQuestionEntity();
            questionBankQuestion.question = question;
            return questionBankQuestion;
        });
        const questionBank = await this.questionBankRepo.save({
            isFinished: false,
            numberOfQuestion: 40,
            questionBankQuestion: questionBankQuestions,
            user: user,
        });

        return questionBank;


    }
    async isLastQuizValid(token: string): Promise<boolean> {
        let userId = getUserId(token);
        const questionBankQueryResult = await this.questionBankRepo
            .createQueryBuilder('question_bank')
            .orderBy('created_at', 'DESC')
            .where('question_bank.user_id = :userId', { userId: userId })
            .andWhere('NOW() - question_bank.created_at > 3')
            .getOne();

        if (questionBankQueryResult == null) {
           return false
        }
        return true
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