import { BaseEntity } from 'src/common/base/base.entity';
import { FollowerEntity } from 'src/modules/follower/entities/follower.entity';
import { MentalHealthDegreeLogEntity } from 'src/modules/mentalHealthDegreeLog/entities/mentalHealthDegreeLog.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('mental_health_log')
export class MentalHealthLogEntity extends BaseEntity {
  @Column({ name: 'user_id' })
  public userId: string;

  @Column({ name: 'question_bank_id' })
  public questionBankId: number;

  @OneToMany(
    () => MentalHealthDegreeLogEntity,
    (mentalHealthDegreeLog) => mentalHealthDegreeLog.mentalHealthLog,
  )
  mentalHealthDegreeLog: MentalHealthDegreeLogEntity[];
}
