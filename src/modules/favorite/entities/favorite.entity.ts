/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/common/base/base.entity';
import { GenreEntity } from 'src/modules/genre/entities/genre.entity';
import UserEntity from 'src/modules/user/entities/user.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('Favorite')
export class FavoriteEntity extends BaseEntity {
  @ManyToOne(() => GenreEntity, (genre) => genre.favorite)
  @JoinColumn({ name: 'genre_id' })
  public genreId: GenreEntity;

  @ManyToOne(() => UserEntity, (user) => user.favorite)
  @JoinColumn({ name: 'user_id' })
  public userId: UserEntity;
}
