import { BaseEntity } from "src/common/base/base.entity";
import { ExerciseStatus } from "src/common/enums/exerciseStatus.enum";
import { ExerciseType } from "src/common/enums/exerciseType.enum";
import { ExerciseEntity } from "src/modules/exercise/entities/exercise.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('exercise_type')
export class ExerciseTypeEntity extends BaseEntity {
    @Column()
    public name: string;

    @Column({
        type: 'enum',
        enum: ExerciseType,
    })
    public type: ExerciseType;

    @Column({
        type: 'enum',
        enum: ExerciseStatus,
    })
    public status: ExerciseStatus;


    @OneToMany(
        () => ExerciseEntity,
        (exercise) => exercise.exerciseType,
    )
    public exercise: ExerciseEntity[];
}