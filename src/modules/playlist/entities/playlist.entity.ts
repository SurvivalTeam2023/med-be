import { BaseEntity } from 'src/common/base/base.entity';
import { FollowerEntity } from 'src/modules/follower/entities/follower.entity';
import { AudioPlaylistEntity } from 'src/modules/audioPlaylist/entities/audioPlaylist.entity';
import { PlaylistTypeEntity } from 'src/modules/playlistType/entities/playlistType.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { PlaylistStatus } from '../../../common/enums/playlistStatus.enum';

@Entity('playlist')
export class PlaylistEntity extends BaseEntity {
  @Column()
  public name: string;

  @Column({ name: "image_url" })
  public imageUrl: string;
  @Column({
    type: 'enum',
    enum: PlaylistStatus
  })
  public status: PlaylistStatus;

  @Column()
  public description: string;

  @OneToMany(() => AudioPlaylistEntity, (audio_playlist) => audio_playlist.playlist,)
  audioPlaylist: AudioPlaylistEntity[];

  @ManyToOne(() => PlaylistTypeEntity, (playlistType) => playlistType.playlist)
  public playlistType: PlaylistTypeEntity;

  @OneToMany(() => FollowerEntity, (follower) => follower.playlistId, {
    cascade: true,
  })
  follower: FollowerEntity[];
}
