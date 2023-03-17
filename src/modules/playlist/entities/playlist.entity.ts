/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/common/base/base.entity';
import { FollowerEntity } from 'src/modules/follower/entities/follower.entity';
import { AudioPlaylistEntity } from 'src/modules/audioPlaylist/entities/audioPlaylist.entity';
import { PlaylistTypeEntity } from 'src/modules/playlistType/entities/playlistType.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { PlaylistStatus } from '../../../common/enums/playlistStatus.enum';
import UserEntity from 'src/modules/user/entities/user.entity';
import { JoinColumn } from 'typeorm/decorator/relations/JoinColumn';

@Entity('playlist')
export class PlaylistEntity extends BaseEntity {
  @Column()
  public name: string;

  @Column({ name: 'author_id' })
  public authorId!: string;

  @Column({ name: 'image_url' })
  public imageUrl: string;
  @Column({
    type: 'enum',
    enum: PlaylistStatus,
  })
  public status: PlaylistStatus;

  @Column()
  public description: string;

  @OneToMany(
    () => AudioPlaylistEntity,
    (audioPlaylist) => audioPlaylist.playlist,
  )
  audioPlaylist: AudioPlaylistEntity[];

  @ManyToOne(() => PlaylistTypeEntity, (playlistType) => playlistType.playlist)
  public playlistType: PlaylistTypeEntity;

  @OneToMany(() => FollowerEntity, (follower) => follower.playlist, {
    cascade: true,
  })
  follower: FollowerEntity[];

}
