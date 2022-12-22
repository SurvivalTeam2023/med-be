import {  Column, Entity, JoinColumn, OneToMany, } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { GenreEntity } from 'src/modules/genre/entities/genre.entity';
import { MentalHealthGenreEntity } from 'src/modules/mentalHealthGenre/entities/mentalHealthGenre.entity';

@Entity('mental_health')
export class MentalHealthEntity extends BaseEntity {
    @Column()
    public name:String;

    @OneToMany(() => MentalHealthGenreEntity, (mentalHealthGenre) => mentalHealthGenre.mentalHealth, {
        cascade: true,
      })
      public mentalHealthGenre: MentalHealthGenreEntity[];
}
