import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentalHealthDegreeLogEntity } from './entities/mentalHealthDegreeLog.entity';
import MentalHealthDegreeLogService from './mentalHealthDegreeLog.service';
import MentalHealthDegreeLogController from './mentalHealthDegreeLog.controller';



@Module({
    imports: [TypeOrmModule.forFeature([MentalHealthDegreeLogEntity])],
    controllers: [MentalHealthDegreeLogController],
    providers: [MentalHealthDegreeLogService],
})
export class MentalHealthDegreeLogModule { }
