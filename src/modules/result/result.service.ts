import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ERROR_MESSAGE } from "src/common/constants/messages.constant";
import { ResultStatus } from "src/common/enums/resultStatus.enum";
import { ErrorHelper } from "src/helpers/error.helper";
import { EntityManager, Repository } from "typeorm";
import { OptionEntity } from "../option/entities/option.entity";
import { QuestionBankEntity } from "../questionBank/entities/questionBank.entity";
import CreateResultDTO from "./dto/createResult.dto";
import { ResultEntity } from "./entities/result.entity";


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

    async createResult(dto: CreateResultDTO): Promise<ResultEntity> {

        const questionBank = await this.entityManage.findOne(QuestionBankEntity, {
            where: { id: dto.questionBankId },
        });

        if (!questionBank) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.QUESTION_BANK.NOT_FOUND)
        }
        let entity: ResultEntity
        for (const id of dto.optionId) {


            const option = await this.entityManage.findOne(OptionEntity, {
                where: { id: id },
            });
            if (!option) {
                ErrorHelper.NotFoundException(ERROR_MESSAGE.QUESTION_BANK.NOT_FOUND)
            }
            entity = await this.resultRepo.save({
                option: option,
                questionBank: questionBank,
                status: dto.status
            });
            questionBank.isFinished = true;
            await this.entityManage.save(questionBank)
        }
        return entity;
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