import { BaseEntity } from "src/common/base/base.entity";
import { ExerciseStatus } from "src/common/enums/exerciseStatus.enum";
import { MentalHealthExerciseEntity } from "src/modules/mentalHealthExercise/entities/mentalHealthExercise.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('exercise')
export class ExerciseEntity extends BaseEntity {
    @Column()
    public name: string;

    @Column()
    public content: string;

    @Column()
    public status: ExerciseStatus;
    

    @OneToMany(
        () => MentalHealthExerciseEntity,
        (mentalHealthExercise) => mentalHealthExercise.exercise,
    )
    public mentalHealthExercise: MentalHealthExerciseEntity[];
}