import { BaseEntity } from 'src/common/base/base.entity';
import { AudioPlaylistEntity } from 'src/modules/audioPlaylist/entities/audioPlaylist.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { PlaylistStatus } from '../../../common/enums/playlistStatus.enum';
import { PlaylistType } from 'src/common/enums/playlistType.enum';
import { PlaylistPublic } from 'src/common/enums/playlistPublic.enum';
import { GenreEntity } from 'src/modules/genre/entities/genre.entity';
import { PlaylistUserEntity } from 'src/modules/follower/entities/playlist_user.entity';

@Entity('playlist')
export class PlaylistEntity extends BaseEntity {
  @Column()
  public name: string;

  @Column({ name: 'author_id' })
  public authorId!: string;

  @Column({ name: 'image_url', nullable: true })
  public imageUrl?: string;
  @Column({
    type: 'enum',
    enum: PlaylistStatus,
  })
  public status: PlaylistStatus;

  @Column()
  public description: string;

  @Column()
  public isDefault: boolean;

  @Column({
    type: 'enum',
    enum: PlaylistPublic,
    name: 'is_public',
  })
  public isPublic: PlaylistPublic;

  @OneToMany(
    () => AudioPlaylistEntity,
    (audioPlaylist) => audioPlaylist.playlist,
  )
  audioPlaylist: AudioPlaylistEntity[];

  @Column({
    type: 'enum',
    enum: PlaylistType,
    name: 'playlist_type',
  })
  public playlistType: PlaylistType;

  @OneToMany(() => PlaylistUserEntity, (follower) => follower.playlist, {
    cascade: true,
  })
  follower: PlaylistUserEntity;

  @ManyToOne(() => GenreEntity, (genre) => genre.playlist, {
  })
  genre: GenreEntity;
}
