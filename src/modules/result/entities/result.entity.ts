/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/common/base/base.entity';
import { ResultStatus } from 'src/common/enums/resultStatus.enum';
import { OptionEntity } from 'src/modules/option/entities/option.entity';
import { QuestionBankEntity } from 'src/modules/questionBank/entities/questionBank.entity';
import UserEntity from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('result')
export class ResultEntity extends BaseEntity {
  @Column({ name: "question_bank_id" })
  questionBankId: number;


  @Column({ type: 'json', name: "option_id" })
  optionIds: number[];

  @Column({ type: 'json', name: "mental_health" })
  mentalHealth: { mentalHealth: string, point: number }[];


  @Column({
    type: 'enum',
    enum: ResultStatus
  })
  public status: ResultStatus;

  @ManyToOne(() => QuestionBankEntity, (questionBank) => questionBank.result)
  @JoinColumn({ name: 'question_bank_id' })
  public questionBank: QuestionBankEntity

  @ManyToOne(() => UserEntity, (user) => user.result)
  @JoinColumn({ name: 'user_id' })
  public user: UserEntity;
}
