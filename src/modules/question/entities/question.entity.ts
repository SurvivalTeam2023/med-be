import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { MentalHealthEntity } from 'src/modules/mentalHealth/entities/mentalHealth.entity';
import { OptionEntity } from 'src/modules/option/entities/option.entity';
import { QuestionBankQuestionEntity } from 'src/modules/questionBankQuestion/entities/questionBankQuestion.entity';
import { ResultEntity } from 'src/modules/result/entities/result.entity';

@Entity('question')
export class QuestionEntity extends BaseEntity {
    @Column()
    public question: string;

    @OneToMany(() => OptionEntity, (option) => option.question, {
        cascade: true,
    })
    public answer: OptionEntity[];

    @OneToMany(() => QuestionBankQuestionEntity, (questionBankQuestion) => questionBankQuestion.question, {
        cascade: true,
    })
    public questionBankQuestion: QuestionBankQuestionEntity[];

    @OneToOne(() => MentalHealthEntity)
    @JoinColumn({ name: "mental_health_id" })
    public mentalHealth: MentalHealthEntity

    @OneToMany(() => ResultEntity, (result) => result.questionId)
    public result: ResultEntity[];
}
