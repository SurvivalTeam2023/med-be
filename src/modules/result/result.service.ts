import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ERROR_MESSAGE } from "src/common/constants/messages.constant";
import { ResultStatus } from "src/common/enums/resultStatus.enum";
import { ErrorHelper } from "src/helpers/error.helper";
import { EntityManager, In, Repository } from "typeorm";
import { OptionEntity } from "../option/entities/option.entity";
import { QuestionBankEntity } from "../questionBank/entities/questionBank.entity";
import CreateResultDTO from "./dto/createResult.dto";
import { ResultEntity } from "./entities/result.entity";
import { getUserId } from "src/utils/decode.utils";
import UserEntity from "../user/entities/user.entity";
import { QuestionEntity } from "../question/entities/question.entity";
import { QuestionMentalHealthEntity } from "../questionMentalHealth/entities/questionMentalHealth.entity";
import { MentalHealthEntity } from "../mentalHealth/entities/mentalHealth.entity";


@Injectable()
export default class ResultService {
    constructor(
        @InjectRepository(ResultEntity)
        private resultRepo: Repository<ResultEntity>,
        private readonly entityManage: EntityManager,
    ) { }
    async findResultById(
        resultId: number,
    ): Promise<ResultEntity> {
        const result = await this.resultRepo
            .createQueryBuilder('result')
            .where('result.id = :resultId', { resultId })
            .getOne();
        if (!result) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.RESULT.NOT_FOUND);
        }
        return result;
    }

    async createResult(dto: CreateResultDTO, token: string): Promise<{ mentalHealth: string, point: number }[]> {

        const userId = getUserId(token);
        const user = await this.entityManage.findOne(UserEntity, { where: { id: userId } });

        if (!user) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.USER.NOT_FOUND);
        }

        const questionBank = await this.entityManage.findOne(QuestionBankEntity, { where: { id: dto.questionBankId } });

        if (!questionBank) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.QUESTION_BANK.NOT_FOUND);
        }

        const result = await this.resultRepo.find({
            where: {
                user: {
                    id: user.id,
                },
            },
        });

        if (result.length === 0) {
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
            const percentageMap = new Map<string, number>();

            for (const [key, value] of mentalHealthMap) {
                const percentage = (value / sum) * 100;
                percentageMap.set(key, percentage);
            }

            const resultArray = Array.from(percentageMap.entries()).map(([mentalHealth, point]) => ({
                mentalHealth,
                point,
            }));
            await this.entityManage.transaction(async (entityManager) => {
                firstResult.mentalHealth = resultArray;
                await entityManager.save(firstResult);
                questionBank.isFinished = true
                await entityManager.save(questionBank)
            })
            return resultArray;


        }
        //  else {
        //     // result for 2nd question and so on 
        //     console.log(dto.optionId);

        //     for (const id of dto.optionId) {
        //         const option = await this.entityManage.findOne(OptionEntity, {
        //             relations: {
        //                 question: true
        //             },
        //             where: { id: id },
        //         });

        //         if (!option) {
        //             ErrorHelper.NotFoundException(ERROR_MESSAGE.QUESTION_BANK.NOT_FOUND)
        //         }

        //         const mentalHealth = await this.entityManage.find(MentalHealthEntity, {
        //             where: {
        //                 questionMentalHealth: {
        //                     question: {
        //                         id: option.question.id
        //                     }
        //                 }
        //             }
        //         });

        //         const resultMentalHealths = mentalHealth.map(e => {
        //             const resultMentalHealth = new ResultMentalHealthEntity()
        //             resultMentalHealth.mentalHealth = e
        //             return resultMentalHealth
        //         });


        //         const result = this.resultRepo.create({
        //             option: option,
        //             resultMentalHealth: resultMentalHealths,
        //             questionBank: questionBank,
        //             user: user,
        //             status: ResultStatus.ACTIVE,
        //         });

        //         questionBank.isFinished = true;
        //         await this.entityManage.save(questionBank);
        //     }
        //     const newResult = await this.resultRepo.find({
        //         where: {
        //             questionBank: {
        //                 id: dto.questionBankId
        //             }
        //         }
        //     })
        //     //calculate percentage of point in question bank for the 2nd result and so on
        // }
    }


    async deleteResult(resultId: number): Promise<ResultEntity> {
        const result = await this.findResultById(resultId)
        if (result) {
            result.status = ResultStatus.INACTIVE;
            await this.resultRepo.save(result);
        }
        return result;
    }
}