import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionEntity } from './entities/option.entity';
import OptionController from './option.controller';
import OptionService from './option.service';



@Module({
    imports: [TypeOrmModule.forFeature([OptionEntity])],
    controllers: [OptionController],
    providers: [OptionService],
})
export class OptionModule { }
