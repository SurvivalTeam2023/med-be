/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/common/base/base.entity';
import { ResultStatus } from 'src/common/enums/resultStatus.enum';
import { OptionEntity } from 'src/modules/option/entities/option.entity';
import { QuestionBankEntity } from 'src/modules/questionBank/entities/questionBank.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('result')
export class ResultEntity extends BaseEntity {
  @Column()
  point: number;
  @Column({
    type: 'enum',
    enum: ResultStatus
  })
  public status: ResultStatus;

  @ManyToOne(() => QuestionBankEntity, (questionBank) => questionBank.result)
  @JoinColumn({ name: 'question_bank_id' })
  public questionBankId: QuestionBankEntity

  @ManyToOne(() => OptionEntity, (option) => option.result)
  @JoinColumn({ name: 'option_id' })
  public optionId: OptionEntity;
}
