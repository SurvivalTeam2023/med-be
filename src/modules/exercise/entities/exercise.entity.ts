import { BaseEntity } from "src/common/base/base.entity";
import { ExerciseStatus } from "src/common/enums/exerciseStatus.enum";
import { ExerciseType } from "src/common/enums/exerciseType.enum";
import { FileEntity } from "src/modules/files/entities/file.entity";
import { MentalHealthExerciseEntity } from "src/modules/mentalHealthExercise/entities/mentalHealthExercise.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity('exercise')
export class ExerciseEntity extends BaseEntity {
    @Column()
    public name: string;

    @Column()
    public content: string;

    @Column()
    ext_fields: string

    @Column({
        type: 'enum',
        enum: ExerciseStatus,
    })
    public status: ExerciseStatus;


    @Column()
    public image: string;


    @Column({ nullable: true })
    public time: string;

    @OneToMany(
        () => MentalHealthExerciseEntity,
        (mentalHealthExercise) => mentalHealthExercise.exercise,
    )
    public mentalHealthExercise: MentalHealthExerciseEntity[];

    @Column({
        type: 'enum',
        enum: ExerciseType,
    })
    public type: ExerciseType;
}
