import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { PromptEntity } from "./entities/prompt.entity";
import { ErrorHelper } from "src/helpers/error.helper";
import { ERROR_MESSAGE } from "src/common/constants/messages.constant";

@Injectable()
export default class PromptService {
    constructor(
        private readonly entityManage: EntityManager,
    ) { }
    async findPrompt(): Promise<PromptEntity[]> {
        const prompt = await this.entityManage
            .createQueryBuilder(PromptEntity, 'prompt')
            .getMany();
        if (!prompt) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.PROMPT.NOT_FOUND);
        }
        return prompt;
    }
}
