import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { AudioGenreEntity } from 'src/modules/audioGenre/entities/audioGenre.entities';
import { GenreStatus } from 'src/common/enums/genreStatus.enum';
import { EmotionEnum } from 'src/common/enums/emotion.enum';
import { GenreUserEntity } from 'src/modules/genreUser/entities/genreUser.entity';
import { PlaylistEntity } from 'src/modules/playlist/entities/playlist.entity';

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


  @OneToMany(() => GenreUserEntity, (favorite) => favorite.genreId, {
    cascade: true,
  })
  public favorite: GenreUserEntity[];

  @OneToMany(() => PlaylistEntity, (playlist) => playlist.genre, {
    cascade: true,
  })
  public playlist: PlaylistEntity[];

  @Column({
    type: 'enum',
    enum: EmotionEnum,
  })
  public emotion: EmotionEnum;
}
