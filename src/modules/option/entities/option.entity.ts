import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { QuestionEntity } from 'src/modules/question/entities/question.entity';
import { ResultEntity } from 'src/modules/result/entities/result.entity';

@Entity('option')
export class OptionEntity extends BaseEntity {
    @Column()
    public answer: string;

    @Column()
    public points: string;

    @ManyToOne(() => QuestionEntity, (question) => question.answer)
    @JoinColumn({ name: 'question_id' })
    public question: QuestionEntity;

    @OneToMany(() => ResultEntity, (result) => result.optionId, {
        cascade: true,
    })
    public result: ResultEntity[];
}
