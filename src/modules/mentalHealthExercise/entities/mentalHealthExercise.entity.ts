import { BaseEntity } from "src/common/base/base.entity";
import { FavoriteStatus } from "src/common/enums/favoriteStatus.enum";
import { ExerciseEntity } from "src/modules/exercise/entities/exercise.entity";
import { MentalHealthEntity } from "src/modules/mentalHealth/entities/mentalHealth.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('mental_health_exercise')
export class MentalHealthExerciseEntity extends BaseEntity {
    @Column({
        type: 'enum',
        enum: FavoriteStatus,
    })
    public isActive: FavoriteStatus;

    @Column({ name: 'mental_health_id' })
    public mentalHealthId!: number;

    @Column({ name: 'exercise_id' })
    public exerciseId!: number;

    @ManyToOne(() => MentalHealthEntity, (mentalHealth) => mentalHealth.mentalHealthExercise)
    @JoinColumn({ name: 'mental_health_id' })
    public mentalHealth: MentalHealthEntity;

    @ManyToOne(() => ExerciseEntity, (exercise) => exercise.mentalHealthExercise)
    @JoinColumn({ name: 'exercise_id' })
    public exercise: ExerciseEntity;
}