import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionBankEntity } from './entities/questionBank.entity';
import QuestionBankController from './questionBank.controller';
import QuestionBankService from './questionBank.service';

@Module({
    imports: [TypeOrmModule.forFeature([QuestionBankEntity])],
    controllers: [QuestionBankController],
    providers: [QuestionBankService],
})
export class QuestionBankModule { }
