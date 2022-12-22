import { Column, Entity, OneToMany, } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { AudioGenreEntity } from 'src/modules/audioGenre/entities/audioGenre.entities';
import { MentalHealthGenreEntity } from 'src/modules/mentalHealthGenre/entities/mentalHealthGenre.entity';

@Entity('genre')
export class GenreEntity extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public desc: string;

  @OneToMany(() => AudioGenreEntity, (audioGenre) => audioGenre.genre, {
    cascade: true,
  })
  public audioGenre: AudioGenreEntity[];

  @OneToMany(() => MentalHealthGenreEntity, (mentalHealthGenre) => mentalHealthGenre.genre, {
    cascade: true,
  })
  public mentalHealthGenre: MentalHealthGenreEntity[];
}

