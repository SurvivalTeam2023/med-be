import { Column, Entity, JoinColumn, ManyToOne, } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { QuestionEntity } from 'src/modules/question/entities/question.entity';
import { QuestionBankEntity } from 'src/modules/questionBank/entities/questionBank.entity';

@Entity('question_bank_question')
export class QuestionBankQuestionEntity extends BaseEntity {

    @Column({ name: 'question_id' })
    public questionId: number;

    @Column({ name: 'question_bank_id' })
    public questionBankId: number;


    @ManyToOne(() => QuestionEntity, (question) => question.questionBankQuestion)
    @JoinColumn({ name: 'question_id' })
    public question: QuestionEntity;

    @ManyToOne(() => QuestionBankEntity, (questionBank) => questionBank.questionBankQuestion)
    @JoinColumn({ name: 'question_bank_id' })
    public questionBank: QuestionBankEntity;
}
