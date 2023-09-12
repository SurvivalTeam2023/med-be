import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentalHealthExerciseEntity } from './entities/mentalHealthExercise.entity';
import MentalHealthExerciseController from './mentalHealthExercise.controller';
import MentalHealthExerciseService from './mentalHealthExercise.service';



@Module({
    imports: [TypeOrmModule.forFeature([MentalHealthExerciseEntity])],
    controllers: [MentalHealthExerciseController],
    providers: [MentalHealthExerciseService],
})
export class MentalHealthExerciseModule { }
