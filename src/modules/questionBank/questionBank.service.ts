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
import CreateQuestionBankDto from "./dto/createQuestionBank.dto";

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
            },
            order: {
                createdAt: "DESC"
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
        const existQuestionBank = await this.questionBankRepo.createQueryBuilder('questionBank')
            .leftJoin('questionBank.user', 'user')
            .leftJoin('questionBank.questionBankQuestion', 'questionBankQuestion')
            .leftJoin('questionBankQuestion.question', 'question')
            .leftJoin('question.option', 'option')
            .where('user.id = :userId', { userId: userId })
            .andWhere('questionBank.is_finished = 0')
            .andWhere('questionBank.number_of_question <=45')
            .select(['questionBank.id', 'questionBankQuestion.id', 'question.id', 'question.question', 'option.id', 'option.option'])
            .orderBy('questionBank.created_at', "DESC")
            .getOne()
        if (existQuestionBank) {
            return existQuestionBank
        } else {
            let questionBankQuestions: QuestionBankQuestionEntity[] = [];
            const result: QuestionEntity[] = [];
            const age = await this.entityManage.findOne(AgeEntity, {
                where: {
                    startAge: LessThanOrEqual(getAge(user.dob)), endAge: MoreThanOrEqual(getAge(user.dob))
                }
            })
            const mentalHealthIds = await this.entityManage.find(MentalHealthEntity, {
                select: {
                    id: true
                }
            })
            console.log(mentalHealthIds);

            for (const m of mentalHealthIds) {
                const questions = await this.entityManage
                    .createQueryBuilder(QuestionEntity, 'question')
                    .leftJoinAndSelect('question.option', 'option')
                    .leftJoinAndSelect('question.age', 'age')
                    .leftJoinAndSelect('question.questionMentalHealth', 'questionMentalHealth')
                    .where('age.id = :ageId', { ageId: age.id })
                    .andWhere('question.status = :status', { status: QuestionStatus.ACTIVE })
                    .andWhere('questionMentalHealth.mentalHealthId = :mentalHealthId', { mentalHealthId: m.id })
                    .select(['question.id', 'question.question', 'option.id', 'option.option', 'questionMentalHealth.mentalHealthId'])
                    .orderBy("RAND()")
                    .take(7)
                    .getMany();
                questions.forEach(question => {
                    question.option = question.option.sort();
                });
                result.push(...questions);
            }
            questionBankQuestions = result.map((question) => {
                const questionBankQuestion = new QuestionBankQuestionEntity();
                questionBankQuestion.question = question;
                return questionBankQuestion;
            });
            const questionBank = await this.questionBankRepo.save({
                isFinished: false,
                numberOfQuestion: result.length,
                questionBankQuestion: questionBankQuestions,
                user: user,
            });

            return questionBank;
        }

    }

    async createQuestionBankByMentalHealth(token: string, dto: CreateQuestionBankDto): Promise<QuestionBankEntity> {
        const userId = getUserId(token);

        const user = await this.entityManage.findOne(UserEntity, {
            where: { id: userId },
        });

        if (!user) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.USER.NOT_FOUND);
        }
        const existQuestionBank = await this.questionBankRepo.createQueryBuilder('questionBank')
            .leftJoin('questionBank.user', 'user')
            .leftJoin('questionBank.questionBankQuestion', 'questionBankQuestion')
            .leftJoin('questionBankQuestion.question', 'question')
            .leftJoin('question.option', 'option')
            .leftJoin('question.questionMentalHealth', 'questionMentalHealth')
            .where('user.id = :userId', { userId: userId })
            .andWhere('questionBank.is_finished = 0')
            .andWhere('questionBank.number_of_question <=10')
            .andWhere('questionMentalHealth.mentalHealthId = :mentalHealthId', { mentalHealthId: dto.mentalHealthId })
            .select(['questionBank.id', 'questionBankQuestion.id', 'question.id', 'question.question', 'option.id', 'option.option'])
            .orderBy('questionBank.created_at', "DESC")
            .getOne()
        if (existQuestionBank) {
            return existQuestionBank
        } else {
            let questionBankQuestions: QuestionBankQuestionEntity[] = [];
            const age = await this.entityManage.findOne(AgeEntity, {
                where: {
                    startAge: LessThanOrEqual(getAge(user.dob)), endAge: MoreThanOrEqual(getAge(user.dob))
                }
            })

            const questions = await this.entityManage
                .createQueryBuilder(QuestionEntity, 'question')
                .leftJoinAndSelect('question.option', 'option')
                .leftJoinAndSelect('question.age', 'age')
                .leftJoinAndSelect('question.questionMentalHealth', 'questionMentalHealth')
                .where('age.id = :ageId', { ageId: age.id })
                .andWhere('question.status = :status', { status: QuestionStatus.ACTIVE })
                .andWhere('questionMentalHealth.mentalHealthId = :mentalHealthId', { mentalHealthId: dto.mentalHealthId })
                .select(['question.id', 'question.question', 'option.id', 'option.option', 'questionMentalHealth.mentalHealthId'])
                .orderBy("RAND()")
                .take(dto.noQuestion)
                .getMany();

            questions.forEach(question => {
                question.option = question.option.sort();
            });


            questionBankQuestions = questions.map((question) => {
                const questionBankQuestion = new QuestionBankQuestionEntity();
                questionBankQuestion.question = question;
                return questionBankQuestion;
            });
            const questionBank = await this.questionBankRepo.save({
                isFinished: false,
                numberOfQuestion: questions.length,
                questionBankQuestion: questionBankQuestions,
                user: user,
            });

            return questionBank;
        }

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