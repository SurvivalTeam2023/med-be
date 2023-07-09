import { BaseEntity } from 'src/common/base/base.entity';
import { FavoriteStatus } from 'src/common/enums/favoriteStatus.enum';
import { GenreEntity } from 'src/modules/genre/entities/genre.entity';
import UserEntity from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('favorite')
export class FavoriteEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: FavoriteStatus,
  })
  public status: FavoriteStatus;

  @Column({ name: 'genre_id' })
  public genreId!: number;

  @Column({ name: 'user_id' })
  public userId!: string;

  @ManyToOne(() => GenreEntity, (genre) => genre.favorite)
  @JoinColumn({ name: 'genre_id' })
  public genre: GenreEntity;

  @ManyToOne(() => UserEntity, (user) => user.favorite)
  @JoinColumn({ name: 'user_id' })
  public user: UserEntity;
}
