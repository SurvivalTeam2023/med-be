
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import { ErrorHelper } from 'src/helpers/error.helper';
import { EntityManager, Repository } from "typeorm";


import {
    IPaginationOptions,
    Pagination,
    paginate,
} from 'nestjs-typeorm-paginate';
import { OptionEntity } from './entities/option.entity';
import SearchOptionDTO from './dto/searchOption.dto';
import CreateOptionDTO from './dto/createOption.dto';
import { QuestionEntity } from '../question/entities/question.entity';
import UpdateOptionDTO from './dto/updateOption.dto';
import { OptionStatus } from 'src/common/enums/optionStatus.enum';

@Injectable()
export default class OptionService {
    constructor(
        private readonly entityManage: EntityManager,
        @InjectRepository(OptionEntity)
        private optionRepo: Repository<OptionEntity>,

    ) { }

    async findOptionById(optionId: number): Promise<OptionEntity> {
        const option = await this.optionRepo.findOneBy({
            id: optionId,
        });
        if (!option)
            ErrorHelper.NotFoundException(ERROR_MESSAGE.OPTION.NOT_FOUND);
        return option;
    }
    async findOption(
        dto: SearchOptionDTO,
        option: IPaginationOptions,
    ): Promise<Pagination<OptionEntity>> {
        const queryBuilder = await this.optionRepo
            .createQueryBuilder('option')
        if (dto.option) queryBuilder.where('LOWER(option.option) like :name', { name: `%${dto.option}%` })
        if (dto.status) queryBuilder.andWhere('option.status = :optionStatus', { optionStatus: dto.status, })
        if (dto.questionId) queryBuilder.andWhere('option.question_id = :questionId', { questionId: dto.questionId, })
            .orderBy('option.created_at', 'DESC');
        return paginate<OptionEntity>(queryBuilder, option);
    }

    async createOption(dto: CreateOptionDTO): Promise<OptionEntity> {
        const question = await this.entityManage.findOne(QuestionEntity, {
            where: { id: dto.questionId },
        });
        if (!question) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.QUESTION.NOT_FOUND);
        }
        const option = await this.optionRepo.save({
            ...dto,
            question: question
        });
        return option;
    }

    async updateOption(
        optionId: number,
        dto: UpdateOptionDTO,
    ): Promise<OptionEntity> {
        const option = await this.findOptionById(optionId)
        if (!option)
            ErrorHelper.NotFoundException(ERROR_MESSAGE.OPTION.NOT_FOUND);

        const updatedOption = await this.optionRepo.save({
            id: option.id,
            ...dto,
        });
        return updatedOption;
    }

    async deleteOption(optionId: number): Promise<OptionEntity> {
        const option = await this.findOptionById(optionId)
        if (!option)
            ErrorHelper.NotFoundException(ERROR_MESSAGE.OPTION.NOT_FOUND);

        option.status = OptionStatus.INACTIVE;
        await this.optionRepo.save(option)
        return option;
    }
}
