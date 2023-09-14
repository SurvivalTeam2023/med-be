import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExerciseEntity } from "./entities/exercise.entity";
import { EntityManager, Repository } from "typeorm";
import CreateExerciseDTO from "./dto/createExercise.dto";
import findExerciseDTO from "./dto/findExercise.dto";
import { ERROR_MESSAGE } from "src/common/constants/messages.constant";
import { ErrorHelper } from "src/helpers/error.helper";
import { FavoriteStatus } from "src/common/enums/favoriteStatus.enum";
import UpdateExerciseDTO from "./dto/updateExercise.dto";
import { ExerciseStatus } from "src/common/enums/exerciseStatus.enum";
import { ExerciseType } from "src/common/enums/exerciseType.enum";

@Injectable()
export default class ExerciseService {
    constructor(
        private readonly entityManage: EntityManager,
        @InjectRepository(ExerciseEntity)
        private repo: Repository<ExerciseEntity>,
    ) { }

    async createExercise(dto: CreateExerciseDTO): Promise<ExerciseEntity> {
        const exercise = this.repo.save({
            ...dto,
        });
        return exercise;
    }

    async findExerciseById(exerciseId: number): Promise<ExerciseEntity> {

        const exercise = await this.repo.findOne({
            where: {
                id: exerciseId
            }
        })


        return exercise
    }

    async findExercise(dto: findExerciseDTO): Promise<ExerciseEntity[]> {
        const queryBuilder = await this.repo
            .createQueryBuilder('exercise')
            .leftJoin('exercise.mentalHealthExercise', 'mentalHealthExercise')
            .leftJoin('mentalHealthExercise.mentalHealth', 'mentalHealth')
            .select(['exercise', 'mentalHealthExercise.id', 'mentalHealth.name'])
        if (dto.name)
            queryBuilder
                .andWhere('LOWER(exercise.name) like :name', { name: `%${dto.name}%` })
                .orderBy('exercise.name', 'ASC');

        if (dto.mentalHealthId)
            queryBuilder
                .where('mentalHealthExercise.mental_health_id = :mentalHealthId', { mentalHealthId: dto.mentalHealthId })
                .orderBy('exercise.name', 'ASC');


        return queryBuilder.orderBy('exercise.name', 'ASC').getMany();
    }
    async updateExercise(
        exerciseId: number,
        dto: UpdateExerciseDTO,
    ): Promise<ExerciseEntity> {
        const exercise = await this.repo.findOne({
            where: {
                id: exerciseId
            }
        })
        if (!exercise) ErrorHelper.NotFoundException(ERROR_MESSAGE.EXERCISE.NOT_FOUND);

        const updatedExercise = await this.repo.save({
            id: exercise.id,
            ...dto,
        });
        return updatedExercise;
    }

    async deleteExercise(exerciseId: number): Promise<ExerciseEntity> {
        const exercise = await this.repo.findOne({
            where: {
                id: exerciseId
            }
        })
        if (!exercise) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.EXERCISE.NOT_FOUND);
        } else if (exercise.type === ExerciseType.DEFAULT) {
            ErrorHelper.BadRequestException(ERROR_MESSAGE.EXERCISE.DEFAULT);
        }
        const updatedExercise = this.repo.save({
            id: exercise.id,
            status: ExerciseStatus.INACTIVE,
        });
        return updatedExercise;
    }
}