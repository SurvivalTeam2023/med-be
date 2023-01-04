import {  Entity, JoinColumn, ManyToOne, } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { GenreEntity } from 'src/modules/genre/entities/genre.entity';
import { MentalHealthEntity } from 'src/modules/mentalHealth/entities/mentalHealth.entity';

@Entity('mental_health_genre')
export class MentalHealthGenreEntity extends BaseEntity {
    


    @ManyToOne(() => MentalHealthEntity, (mental_health) => mental_health.mentalHealthGenre)
    @JoinColumn({ name: 'mental_health_id' })
    public mentalHealth: MentalHealthEntity;
  
    @ManyToOne(() => GenreEntity, (genre) => genre.mentalHealthGenre)
    @JoinColumn({ name: 'genre_id' })
    public genre: GenreEntity;
}
