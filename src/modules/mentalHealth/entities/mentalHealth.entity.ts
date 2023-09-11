import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { QuestionMentalHealthEntity } from 'src/modules/questionMentalHealth/entities/questionMentalHealth.entity';
import { MentalHealthDegreeEntity } from 'src/modules/mentalHealthDegree/entities/mentalHealthDegree.entity';
import { MentalHealthStatus } from 'src/common/enums/mentalHealth.enum';
import { PromptEntity } from 'src/modules/prompt/entities/prompt.entity';

@Entity('mental_health')
export class MentalHealthEntity extends BaseEntity {
  @Column()
  public name: string;

  @Column({ name: "image_url" })
  public imageUrl: string;

  @Column({ type: "varchar", length: 8192 })
  public description: string;


  @Column({ nullable: true })
  public color: string;

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

  @OneToMany(
    () => PromptEntity,
    (prompt) => prompt.mentalHealth,
  )
  public prompt: PromptEntity[];

}
