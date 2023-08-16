import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { QuestionMentalHealthEntity } from 'src/modules/questionMentalHealth/entities/questionMentalHealth.entity';
import { MentalHealthDegreeEntity } from 'src/modules/mentalHealthDegree/entities/mentalHealthDegree.entity';
import { MentalHealthStatus } from 'src/common/enums/mentalHealth.enum';

@Entity('mental_health')
export class MentalHealthEntity extends BaseEntity {
  @Column()
  public name: string;

  @Column({ type: "varchar",length: 1024 })
  public description: string;

  @Column({
    type: 'enum',
    enum: MentalHealthStatus,
  })
  public status: MentalHealthStatus;

  @OneToMany(
    () => QuestionMentalHealthEntity,
    (questionMentalHealth) => questionMentalHealth.mentalHealth,
  )
  public questionMentalHealth: QuestionMentalHealthEntity[];


  @OneToMany(
    () => MentalHealthDegreeEntity,
    (mentalHealthDegree) => mentalHealthDegree.mentalHealth,
  )
  public mentalHealthDegree: MentalHealthDegreeEntity[];
}
