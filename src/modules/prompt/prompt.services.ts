import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { PromptEntity } from "./entities/prompt.entity";
import { ErrorHelper } from "src/helpers/error.helper";
import { ERROR_MESSAGE } from "src/common/constants/messages.constant";
import { OPENAI_API_KEY } from "src/environments";
import OpenAI from "openai";

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
    async generateText(prompt: string): Promise<string> {
        console.log(prompt);

        const openai = new OpenAI({
            apiKey: OPENAI_API_KEY,
        });
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": "Medy is a helpful chatbot that help people with their mental health" },
                { "role": "user", "content": prompt },
            ],
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ["stop"],
        });
        return response.choices[0].message.content
    }

}


