/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { GenreEntity } from 'src/modules/genre/entities/genre.entity';
import { MentalHealthGenreEntity } from 'src/modules/mentalHealthGenre/entities/mentalHealthGenre.entity';
import { QuestionMentalHealthEntity } from 'src/modules/questionMentalHealth/entities/questionMentalHealth.entity';
import { MentalHealthDegreeEntity } from 'src/modules/mentalHealthDegree/entities/mentalHealthDegree.entity';

@Entity('mental_health')
export class MentalHealthEntity extends BaseEntity {
  @Column()
  public name: string;

  @OneToMany(
    () => MentalHealthGenreEntity,
    (mentalHealthGenre) => mentalHealthGenre.mentalHealth,
  )
  public mentalHealthGenre: MentalHealthGenreEntity[];

  @OneToMany(
    () => QuestionMentalHealthEntity,
    (questionMentalHealthmental) => questionMentalHealthmental.mentalHealth,
  )
  public questionMentalHealthmental: QuestionMentalHealthEntity[];

  @OneToMany(
    () => MentalHealthDegreeEntity,
    (mentalHealthDegree) => mentalHealthDegree.mentalHealth,
  )
  public mentalHealthDegree: MentalHealthDegreeEntity[];
}
