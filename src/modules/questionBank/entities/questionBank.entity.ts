import { BaseEntity } from 'src/common/base/base.entity';
import { QuestionBankQuestionEntity } from 'src/modules/questionBankQuestion/entities/questionBankQuestion.entity';
import { ResultEntity } from 'src/modules/result/entities/result.entity';
import UserEntity from 'src/modules/user/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('question_bank')
export class QuestionBankEntity extends BaseEntity {

    @OneToMany(() => ResultEntity, (result) => result.questionBankId, {
        cascade: true,
    })
    public result: ResultEntity[];

    @OneToMany(() => QuestionBankQuestionEntity, (questionBankQuestion) => questionBankQuestion.questionBank, {
        cascade: true,
    })
    public questionBankQuestion: QuestionBankQuestionEntity[];

    @ManyToOne(() => UserEntity, (user) => user.questionBank)
    @JoinColumn({ name: "subcriber_id" })
    public subcriberId: UserEntity;
}
