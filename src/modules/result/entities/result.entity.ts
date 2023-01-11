/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/common/base/base.entity';
import { OptionEntity } from 'src/modules/option/entities/option.entity';
import { QuestionEntity } from 'src/modules/question/entities/question.entity';
import { QuestionBankEntity } from 'src/modules/questionBank/entities/questionBank.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('result')
export class ResultEntity extends BaseEntity {
  @Column()
  point: number;

  @ManyToOne(() => QuestionBankEntity, (questionBank) => questionBank.result)
  @JoinColumn({ name: 'question_bank_id' })
  public questionBankId: QuestionBankEntity;

  @ManyToOne(() => QuestionEntity, (question) => question.result)
  @JoinColumn({ name: 'question_id' })
  public questionId: QuestionEntity;

  @ManyToOne(() => OptionEntity, (option) => option.result)
  @JoinColumn({ name: 'option_id' })
  public optionId: OptionEntity;
}
