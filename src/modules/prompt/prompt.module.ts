import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromptEntity } from './entities/prompt.entity';
import PromptController from './prompt.controller';
import PromptService from './prompt.services';



@Module({
    imports: [TypeOrmModule.forFeature([PromptEntity])],
    controllers: [PromptController],
    providers: [PromptService]
})
export class PromptModule { }
