import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExerciseEntity } from "./entities/exercise.entity";
import ExerciseService from "./exercise.services";
import ExerciseController from "./exercise.controller";


@Module({
    imports: [TypeOrmModule.forFeature([ExerciseEntity])],
    controllers: [ExerciseController],
    providers: [ExerciseService],
})
export class ExerciseModule { }
