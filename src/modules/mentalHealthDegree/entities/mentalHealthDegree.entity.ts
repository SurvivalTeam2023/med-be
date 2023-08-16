import { BaseEntity } from 'src/common/base/base.entity';
import { MentalHealthStatus } from 'src/common/enums/mentalHealth.enum';
import { MentalHealthEntity } from 'src/modules/mentalHealth/entities/mentalHealth.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('mental_health_degree')
export class MentalHealthDegreeEntity extends BaseEntity {


  @Column()
  public title: string;

  @Column({ type: "varchar", length: 1024 })
  public description: string;

  @Column({
    type: 'enum',
    enum: MentalHealthStatus
  })
  public status: MentalHealthStatus;

  @Column()
  public pointStart: number

  @Column()
  public pointEnd: number

  @ManyToOne(() => MentalHealthEntity, (mentalHealth) => mentalHealth.mentalHealthDegree, {
    cascade: true,
  })
  @JoinColumn({ name: 'mental_health_id' })
  public mentalHealth: MentalHealthEntity;
}


