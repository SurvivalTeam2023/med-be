import { BaseEntity } from 'src/common/base/base.entity';
import { AudioEntity } from 'src/modules/audio/entities/audio.entity';
import { MentalHealthEntity } from 'src/modules/mentalHealth/entities/mentalHealth.entity';
import { PlaylistEntity } from 'src/modules/playlist/entities/playlist.entity';
import { QuestionEntity } from 'src/modules/question/entities/question.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('question_mental_health')
export class QuestionMentalHealthEntity extends BaseEntity {

  @Column({ name: 'mental_health_id' })
  public mentalHealthId!: number;

  @Column({ name: 'question_id' })
  public questionId!: number;

  @ManyToOne(() => MentalHealthEntity, (mentalHealth) => mentalHealth.questionMentalHealth, {
    cascade: true,
  })
  @JoinColumn({ name: 'mental_health_id' })
  public mentalHealth: MentalHealthEntity;

  @ManyToOne(() => QuestionEntity, (question) => question.questionMentalHealth, {
    cascade: true,
  })
  @JoinColumn({ name: 'question_id' })
  public question: QuestionEntity;

}


