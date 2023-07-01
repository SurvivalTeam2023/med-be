import { BaseEntity } from "src/common/base/base.entity";
import { QuestionEntity } from "src/modules/question/entities/question.entity";
import { Entity, Column, OneToMany } from "typeorm";

@Entity('age')
export class AgeEntity extends BaseEntity {
    @Column({ name: 'start_age' })
    public startAge: number;

    @Column({ name: 'end_age' })
    public endAge: number;

    @OneToMany(() => QuestionEntity, (question) => question.age, {
        cascade: true,
    })
    public question: QuestionEntity[];
}
