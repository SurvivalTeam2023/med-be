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

        const checkQuestionBank = await this.questionBankRepo.findOne({
            relations: {
                user: true
            },
            where: {
                user: {
                    id: user.id
                },
            }
        });
        console.log(checkQuestionBank);

        let questionBankQuestions: QuestionBankQuestionEntity[] = [];
        const age = getAge(user.dob);
        if (!checkQuestionBank)
        //create first questionBank
        {

            const questions = await this.entityManage.find(QuestionEntity, {
                relations: {
                    option: true,
                    age: true
                },
                where: {
                    age: {
                        startAge: LessThanOrEqual(age),
                        endAge: MoreThanOrEqual(age),
                    },
                    default: true,
                    status: QuestionStatus.ACTIVE
                },
                select: {
                    id: true,
                    question: true,
                    option: {
                        id: true,
                        option: true
                    }
                },
                take: 12
            });

            questionBankQuestions = questions.map((question) => {
                const questionBankQuestion = new QuestionBankQuestionEntity();
                questionBankQuestion.question = question;
                return questionBankQuestion;
            });
            const questionBank = await this.questionBankRepo.save({
                isFinished: false,
                numberOfQuestion: 12,
                questionBankQuestion: questionBankQuestions,
                user: user,
            });

            return questionBank;
        }
        //Create question bank 2# and so on  
        else if (checkQuestionBank && checkQuestionBank.isFinished == false) {
            return checkQuestionBank
        } else {
            const result = await this.entityManage.findOne(ResultEntity, {
                where: {
                    questionBank: {
                        id: checkQuestionBank.id
                    },
                }
            })

            const mentalHealths = result.mentalHealth.map(e => {
                return e.mentalHealth
            })
            console.log(mentalHealths);
            const count = 10 / mentalHealths.length
            let questionList: QuestionEntity[] = []
            for (const mentalHealth of mentalHealths) {
                const mentalHealths = await this.entityManage.findOne(MentalHealthEntity, {
                    where: {
                        name: mentalHealth
                    }
                })
                const questions = await this.entityManage
                    .createQueryBuilder()
                    .from(QuestionEntity, 'question')
                    .leftJoinAndSelect('question.option', 'option')
                    .leftJoin('question.questionMentalHealth', 'questionMentalHealth')
                    .select(['question.id', 'question.question', 'question.status', 'option.id', 'option.option'])
                    .where("question.status = 'ACTIVE'")
                    .andWhere("questionMentalHealth.mentalHealthId = :mentalHealthId", { mentalHealthId: mentalHealths.id })
                    .orderBy('RAND()')
                    .take(count)
                    .getMany();

                questionList.push(...questions)
            }

            console.log(questionList, "list");

            questionBankQuestions = questionList.map((question) => {
                const questionBankQuestion = new QuestionBankQuestionEntity();
                questionBankQuestion.question = question;
                return questionBankQuestion;
            });
        }

        const questionBank = await this.questionBankRepo.save({
            isFinished: false,
            numberOfQuestion: 10,
            questionBankQuestion: questionBankQuestions,
            user: user
        });

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