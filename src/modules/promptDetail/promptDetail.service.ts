import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { ErrorHelper } from "src/helpers/error.helper";
import { ERROR_MESSAGE } from "src/common/constants/messages.constant";
import { PromptDetailEntity } from "./entities/promptDetail.entity";

@Injectable()
export default class PromptDetailService {
    constructor(
        private readonly entityManage: EntityManager,
    ) { }
    async findPrompt(): Promise<PromptDetailEntity[]> {
        const promptDetail = await this.entityManage
            .createQueryBuilder(PromptDetailEntity, 'prompt')
            .getMany();
        if (!promptDetail) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.PROMPT.NOT_FOUND);
        }
        return promptDetail;
    }
}
