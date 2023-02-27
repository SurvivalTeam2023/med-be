import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './entities/question.entity';
import QuestionController from './question.controller';
import QuestionService from './question.service';


@Module({
    imports: [TypeOrmModule.forFeature([QuestionEntity])],
    controllers: [QuestionController],
    providers: [QuestionService],
})
export class QuestionModule { }