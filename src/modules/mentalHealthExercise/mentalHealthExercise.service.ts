import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MentalHealthExerciseEntity } from "./entities/mentalHealthExercise.entity";
import { EntityManager, Repository } from "typeorm";
import UpdateMentalHealthExerciseDTO from "./dto/updateExercise.dto";
import { FavoriteStatus } from "src/common/enums/favoriteStatus.enum";

Injectable()
export default class MentalHealthExerciseService {
    constructor(
        @InjectRepository(MentalHealthExerciseEntity)
        private repo: Repository<MentalHealthExerciseEntity>,
        private readonly entityManage: EntityManager,
    ) { }


    async updateMentalHealthExercise(mentalHealthId: number, dto: UpdateMentalHealthExerciseDTO): Promise<any> {
        const mentalHealthExercise = await this.repo.find({
            where: {
                mentalHealthId: mentalHealthId,
            }
        })
        const updatePromises = mentalHealthExercise.map(async (m) => {
            if (!dto.exerciseId.includes(m.exerciseId) && m.isActive === "ACTIVE") {
                await this.repo.save({
                    id: m.id,
                    isActive: FavoriteStatus.INACTIVE
                });
            } else if (dto.exerciseId.includes(m.exerciseId) && m.isActive === "INACTIVE") {
                await this.repo.save({
                    id: m.id,
                    isActive: FavoriteStatus.ACTIVE
                });
            } else {

            }

        });

        const newExercises = dto.exerciseId.filter(exerciseId => !mentalHealthExercise.some(m => m.exerciseId === exerciseId));
        const newExercisePromises = newExercises.map(async (exerciseId) => {
            await this.repo.save({
                // Set appropriate properties for the new exercise
                mentalHealthId: mentalHealthId,
                exerciseId: exerciseId,
                isActive: FavoriteStatus.ACTIVE // You can set the initial status as needed
            });
        });
        // Wait for all the updatePromises to complete
        await Promise.all(updatePromises);

        await Promise.all(newExercisePromises);
        // Now, fetch and return the updated mental health exercises
        const updateMentalHealthExercise = await this.repo.find({
            where: {
                mentalHealthId: mentalHealthId
            }
        });

        return updateMentalHealthExercise;
    }

}