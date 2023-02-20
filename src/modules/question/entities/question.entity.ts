/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { MentalHealthEntity } from 'src/modules/mentalHealth/entities/mentalHealth.entity';
import { OptionEntity } from 'src/modules/option/entities/option.entity';
import { QuestionBankQuestionEntity } from 'src/modules/questionBankQuestion/entities/questionBankQuestion.entity';
import { ResultEntity } from 'src/modules/result/entities/result.entity';
import { QuestionMentalHealthEntity } from 'src/modules/questionMentalHealth/entities/questionMentalHealth.entity';
import { QuestionStatus } from 'src/common/enums/questionStatus.enum';

@Entity('question')
export class QuestionEntity extends BaseEntity {
  @Column()
  public question: string;

  @OneToMany(() => OptionEntity, (option) => option.question, {
    cascade: true,
  })
  public option: OptionEntity[];

  @OneToMany(
    () => QuestionBankQuestionEntity,
    (questionBankQuestion) => questionBankQuestion.question,
    {
      cascade: true,
    },
  )
  public questionBankQuestion: QuestionBankQuestionEntity[];

  @Column({
    type: 'enum',
    enum: QuestionStatus
  })
  public status: QuestionStatus;

  @OneToMany(
    () => QuestionMentalHealthEntity,
    (questionMentalHealth) => questionMentalHealth.question,
  )
  public questionMentalHealth: QuestionMentalHealthEntity[];
}
