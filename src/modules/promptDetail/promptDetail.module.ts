import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromptDetailEntity } from './entities/promptDetail.entity';
import PromptDetailController from './promptDetail.controller';
import PromptDetailService from './promptDetail.service';



@Module({
    imports: [TypeOrmModule.forFeature([PromptDetailEntity])],
    controllers: [PromptDetailController],
    providers: [PromptDetailService]
})
export class PromptModule { }
