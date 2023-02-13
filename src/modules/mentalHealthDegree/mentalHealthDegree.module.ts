import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentalHealthDegreeEntity } from './entities/mentalHealthDegree.entity';
import MentalHealthDegreeController from './mentalHealthDegree.controller';
import MentalHealthDegreeService from './mentalHealthDegree.service';




@Module({
    imports: [TypeOrmModule.forFeature([MentalHealthDegreeEntity])],
    controllers: [MentalHealthDegreeController],
    providers: [MentalHealthDegreeService],
})
export class MentalHealthDegreeModule { }
