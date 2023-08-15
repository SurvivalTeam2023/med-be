import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ERROR_MESSAGE } from "src/common/constants/messages.constant";
import { ResultStatus } from "src/common/enums/resultStatus.enum";
import { ErrorHelper } from "src/helpers/error.helper";
import { EntityManager, In, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { OptionEntity } from "../option/entities/option.entity";
import { QuestionBankEntity } from "../questionBank/entities/questionBank.entity";
import CreateResultDTO from "./dto/createResult.dto";
import { ResultEntity } from "./entities/result.entity";
import { getUserId } from "src/utils/decode.utils";
import UserEntity from "../user/entities/user.entity";
import { QuestionEntity } from "../question/entities/question.entity";
import { QuestionMentalHealthEntity } from "../questionMentalHealth/entities/questionMentalHealth.entity";
import { MentalHealthEntity } from "../mentalHealth/entities/mentalHealth.entity";
import { MentalHealthDegreeEntity } from "../mentalHealthDegree/entities/mentalHealthDegree.entity";
import ResultDTO from "./dto/result.dto";
import { MentalHealthDegreeLogEntity } from "../mentalHealthDegreeLog/entities/mentalHealthDegreeLog.entity";
import { MentalHealthLogEntity } from "../mentalHealthLog/entities/mentalHealthLog.entity";


@Injectable()
export default class ResultService {
    constructor(
        @InjectRepository(ResultEntity)
        private resultRepo: Repository<ResultEntity>,
        private readonly entityManage: EntityManager,
    ) { }
    async findResultById(
        resultId: number,
    ): Promise<any> {
        const result = await this.resultRepo
            .createQueryBuilder('result')
            .where('result.id = :resultId', { resultId })
            .getOne();
        if (!result) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.RESULT.NOT_FOUND);
        }


        const sum = result.mentalHealth.reduce((accumulator, mentalHealth) => accumulator + mentalHealth.point, 0);

        const degreeMap = new Map<string, MentalHealthDegreeEntity>();
        const percentageMapArray = Promise.all(result.mentalHealth.map(async m => {
            const mentalHealths = await this.entityManage.findOne(MentalHealthEntity, {
                where: {
                    name: m.mentalHealth
                }
            })
            const degree = await this.entityManage.findOne(MentalHealthDegreeEntity, {
                relations: {
                    mentalHealth: true
                },
                where: {
                    pointStart: LessThanOrEqual(m.point),
                    pointEnd: MoreThanOrEqual(m.point),
                    mentalHealth: {
                        name: m.mentalHealth,
                    },
                },
            });
            if (degree) {
                degreeMap.set(m.mentalHealth, degree);
            }
            const percentage = m.point / sum * 100
            return {
                mentalHealth: m.mentalHealth,
                mentalHealthDesc: mentalHealths.description,
                percentage: percentage,
                degree: degree.title,
                degreeDesc: degree.description
            }

        }))
        return percentageMapArray;
    }

    async createResult(dto: CreateResultDTO, token: string): Promise<any> {

        const userId = getUserId(token);
        const user = await this.entityManage.findOne(UserEntity, { where: { id: userId } });

        if (!user) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.USER.NOT_FOUND);
        }

        const questionBank = await this.entityManage.findOne(QuestionBankEntity, { where: { id: dto.questionBankId } });

        if (!questionBank) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.QUESTION_BANK.NOT_FOUND);
        }

        if (dto.optionId.length < questionBank.numberOfQuestion) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.RESULT.NOT_ENOUGH);
        }
        const firstResult = await this.resultRepo.create({
            optionIds: dto.optionId,
            questionBank: questionBank,
            status: ResultStatus.ACTIVE,
            user: user
        });

        const optionPromises = dto.optionId.map(async (id) => {
            const option = await this.entityManage.findOne(OptionEntity, {
                relations: {
                    question: true,
                },
                where: { id: id },
            });

            if (!option) {
                ErrorHelper.NotFoundException(ERROR_MESSAGE.QUESTION_BANK.NOT_FOUND);
            }

            return { question: option.question, points: option.points };
        });

        const questionOptions = await Promise.all(optionPromises);

        const mentalHealthMap = new Map<string, number>();

        for (const { question, points } of questionOptions) {
            const questionMentalHealth = await this.entityManage.findOne(QuestionMentalHealthEntity, {
                relations: {
                    mentalHealth: true,
                },
                where: {
                    question: {
                        id: question.id,
                    },
                }
            }
            )

            if (!questionMentalHealth) {
                continue;
            }

            const mentalHealth = questionMentalHealth.mentalHealth.name;
            const updateValue = mentalHealthMap.get(mentalHealth) || 0;
            mentalHealthMap.set(mentalHealth, updateValue + points);
        }
        const sum = Array.from(mentalHealthMap.values()).reduce((accumulator, value) => accumulator + value, 0);


        const resultArray = Array.from(mentalHealthMap.entries()).map(([mentalHealth, point]) => ({
            mentalHealth,
            point,
        }));
        const percentageMapArray = Array.from(mentalHealthMap.entries()).map(([mentalHealth, point,]) => ({
            mentalHealth,
            point: point / sum * 100,
        }));
        await this.entityManage.transaction(async (entityManager) => {
            firstResult.mentalHealth = resultArray;
            await entityManager.save(firstResult);
            questionBank.isFinished = true
            await entityManager.save(questionBank)
        })
        const degreeMap = new Map<string, MentalHealthDegreeEntity>();
        for (const [mentalHealth, point] of mentalHealthMap) {
            const degree = await this.entityManage.findOne(MentalHealthDegreeEntity, {
                relations: {
                    mentalHealth: true
                },
                where: {
                    pointStart: LessThanOrEqual(point),
                    pointEnd: MoreThanOrEqual(point),
                    mentalHealth: {
                        name: mentalHealth,
                    },
                },
            });
            if (degree) {
                degreeMap.set(mentalHealth, degree);
            }
            const mentalHealthLog = await this.entityManage.save(MentalHealthLogEntity, {
                userId: userId,
                questionBankId: dto.questionBankId,
            })
            await this.entityManage.save(MentalHealthDegreeLogEntity, {
                mentalHealthLog: mentalHealthLog,
                mentalHealthId: degree.mentalHealth.id,
                mentalHealthDegreeId: degree.id
            })
        }
        const percentageMapArrayWithDegree = Promise.all(percentageMapArray.map(async ({ mentalHealth, point }) => {
            const mentalHealths = await this.entityManage.findOne(MentalHealthEntity, {
                where: {
                    name: mentalHealth
                }
            })

            const degree = degreeMap.get(mentalHealth);
            return {
                mentalHealth: mentalHealths.name,
                mentalHealthDesc: mentalHealths.description,
                point: point,
                degree: degree.title,
                degreeDesc: degree.description
            };
        }))

        return percentageMapArrayWithDegree;
    }



    async deleteResult(resultId: number): Promise<ResultEntity> {
        const result = await this.findResultById(resultId)
        if (result) {
            result.status = ResultStatus.INACTIVE;
            await this.resultRepo.save(result);
        }
        return result;
    }

    async findResultByUserId(
        token: string,
    ): Promise<ResultDTO[]> {
        const userId = getUserId(token)
        const result = await this.resultRepo
            .createQueryBuilder('result')
            .leftJoin('result.user', 'user')
            .where('user.id = :userId', { userId })
            .getMany()
        if (!result) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.RESULT.NOT_FOUND);
        }
        const resultArray = result.map(r => {
            const mentalHealthValueArray = r.mentalHealth.map((item) => item.mentalHealth);
            const resultDto: ResultDTO = { id: r.id, questionBankId: r.questionBankId, createdAt: r.createdAt, mentalHealth: mentalHealthValueArray }
            return resultDto
        })

        return resultArray;
    }
}