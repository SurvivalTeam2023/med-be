/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { AudioGenreEntity } from 'src/modules/audioGenre/entities/audioGenre.entities';
import { MentalHealthGenreEntity } from 'src/modules/mentalHealthGenre/entities/mentalHealthGenre.entity';
import { GenreStatus } from 'src/common/enums/genreStatus.enum';
import { FavoriteEntity } from 'src/modules/favorite/entities/favorite.entity';
import { EmotionEnum } from 'src/common/enums/emotion.enum';

@Entity('genre')
export class GenreEntity extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public desc: string;

  @Column()
  public image: string;

  @Column({
    type: 'enum',
    enum: GenreStatus,
  })
  public status: GenreStatus;

  @OneToMany(() => AudioGenreEntity, (audioGenre) => audioGenre.genre, {
    cascade: true,
  })
  public audioGenre: AudioGenreEntity[];

  @OneToMany(
    () => MentalHealthGenreEntity,
    (mentalHealthGenre) => mentalHealthGenre.genre,
    {
      cascade: true,
    },
  )
  public mentalHealthGenre: MentalHealthGenreEntity[];

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.genreId, {
    cascade: true,
  })
  public favorite: FavoriteEntity[];

  @Column({
    type: 'enum',
    enum: EmotionEnum,
  })
  public emotion: EmotionEnum;
}
