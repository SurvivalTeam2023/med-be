import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { QuestionEntity } from 'src/modules/question/entities/question.entity';
import { ResultEntity } from 'src/modules/result/entities/result.entity';
import { OptionStatus } from 'src/common/enums/optionStatus.enum';

@Entity('option')
export class OptionEntity extends BaseEntity {
    @Column()
    public option: string;

    @Column()
    public points: number;

    @Column({
        type: 'enum',
        enum: OptionStatus
    })
    public status: OptionStatus;

    @Column({ name: 'question_id' })
    public questionId: number

    @ManyToOne(() => QuestionEntity, (question) => question.option)
    @JoinColumn({ name: 'question_id' })
    public question: QuestionEntity;
}
