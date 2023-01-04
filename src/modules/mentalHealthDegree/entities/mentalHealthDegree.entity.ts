import { BaseEntity } from 'src/common/base/base.entity';
import { MentalHealthEntity } from 'src/modules/mentalHealth/entities/mentalHealth.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('question_mental_health')
export class MentalHealthDegreeEntity extends BaseEntity {


  @Column()
  public title: String;

  @Column()
  public pointStart:number

  @Column()
  public pointEnd:number

  @ManyToOne(() => MentalHealthEntity, (mentalHealth) => mentalHealth.mentalHealthDegree, {
    cascade: true,
  })
  @JoinColumn({ name: 'mental_health_id' })
  public mentalHealth: MentalHealthEntity;
}


