import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { ERROR_MESSAGE } from "src/common/constants/messages.constant";
import { QuestionStatus } from "src/common/enums/questionStatus.enum";
import { ErrorHelper } from "src/helpers/error.helper";
import { EntityManager, Repository } from "typeorm";
import { QuestionMentalHealthEntity } from "../questionMentalHealth/entities/questionMentalHealth.entity";
import CreateQuestionDTO from "./dto/createQuestion.dto";
import SearchQuestionDTO from "./dto/searchQuestion.dto";
import UpdateQuestionDTO from "./dto/updateQuestion.dto";
import { QuestionEntity } from "./entities/question.entity";
import { OptionEntity } from "../option/entities/option.entity";
import { AgeEntity } from "../age/entities/age.entity";

@Injectable()
export default class QuestionService {
    constructor(
        private readonly entityManage: EntityManager,
        @InjectRepository(QuestionEntity)
        private questionRepo: Repository<QuestionEntity>,
    ) { }
    async findQuestionById(
        questionId: number,
    ): Promise<QuestionEntity> {
        const question = await this.questionRepo
            .createQueryBuilder('question')
            .where('question.id = :questionId', { questionId })
            .getOne();
        if (!question) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.QUESTION.NOT_FOUND);
        }
        return question;
    }

    async findQuestions(
        dto: SearchQuestionDTO,
        option: IPaginationOptions,
    ): Promise<Pagination<QuestionEntity>> {
        const querybuilder = this.questionRepo
            .createQueryBuilder('question')
            .leftJoinAndSelect('question.option', 'option')
            .groupBy('question.id')
            .select(['question'])
        if (dto.question) querybuilder.where('LOWER(question.question) like :name', { name: `%${dto.question}%` }).orderBy('question.created_at', 'DESC')

        if (dto.status) querybuilder.andWhere('question.status = :questionStatus', { questionStatus: dto.status }).orderBy('question.created_at', 'DESC')
        const result = await paginate<QuestionEntity>(querybuilder, option)
        const question = await Promise.all(result.items.map(async e => {
            const option = await this.entityManage.find(OptionEntity, {
                where: {
                    question: {
                        id: e.id
                    }
                },
                select: {
                    id: true,
                    option: true,
                    points: true
                }
            })
            const question = {
                ...e,
                option: option
            }
            return question
        }))

        return {
            meta: result.meta,
            items: question
        }
    }
    async createQuestion(dto: CreateQuestionDTO): Promise<QuestionEntity> {
        const questionMentalHealths = dto.mentalHealthId.map((mentalHealthId) => {
            const questionMentalHealth = new QuestionMentalHealthEntity();
            if (!mentalHealthId) {
                ErrorHelper.NotFoundException(ERROR_MESSAGE.MENTAL_HEALTH.NOT_FOUND);
            }
            questionMentalHealth.mentalHealthId = mentalHealthId;
            return questionMentalHealth;
        });
        const age = await this.entityManage.findOne(AgeEntity, {
            where: {
                id: dto.ageId
            }
        })
        const entity = await this.questionRepo.save({
            ...dto,
            questionMentalHealth: questionMentalHealths,
            age: age
        });
        return entity;
    }

    async updateQuestion(
        questionId: number,
        dto: UpdateQuestionDTO,
    ): Promise<QuestionEntity> {
        const question = await this.questionRepo.findOneBy({
            id: questionId,
        });
        if (!question) ErrorHelper.NotFoundException(ERROR_MESSAGE.QUESTION.NOT_FOUND);

        const updatedQuestion = await this.questionRepo.save({
            id: question.id,
            ...dto,
        });
        return updatedQuestion;
    }

    async deleteQuestion(questionId: number): Promise<QuestionEntity> {
        const question = await this.questionRepo.findOne({
            where: { id: questionId },
        });
        if (question) {
            question.status = QuestionStatus.INACTIVE;
            await this.questionRepo.save(question);
        }
        return question;
    }
}