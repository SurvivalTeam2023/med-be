import { BaseEntity } from 'src/common/base/base.entity';
import { AudioEntity } from 'src/modules/audio/entities/audio.entity';
import { PlaylistEntity } from 'src/modules/playlist/entities/playlist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('audio_playlist')
export class AudioPlaylistEntity extends BaseEntity{

  @Column()
  public audio_id!: number;

  @Column()
  public playlist_id!: number;

  @ManyToOne(() => AudioEntity, (audio) => audio.audio_playlist)
  @JoinColumn({ name: 'audio_id' })
  public audio: AudioEntity;

  @ManyToOne(() => PlaylistEntity, (playlist) => playlist.audio_playlist)
  @JoinColumn({ name: 'playlist_id' })
  public playlist: PlaylistEntity;

}


