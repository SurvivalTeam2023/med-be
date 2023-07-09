import { BaseEntity } from 'src/common/base/base.entity';
import { AudioEntity } from 'src/modules/audio/entities/audio.entity';
import { PlaylistEntity } from 'src/modules/playlist/entities/playlist.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('audio_playlist')
export class AudioPlaylistEntity extends BaseEntity {
  @Column({ name: 'audio_id' })
  public audioId!: number;

  @Column({ name: 'playlist_id' })
  public playlistId!: number;

  @ManyToOne(() => AudioEntity, (audio) => audio.audioPlaylist, {})
  @JoinColumn({ name: 'audio_id' })
  public audio: AudioEntity;

  @ManyToOne(() => PlaylistEntity, (playlist) => playlist.audioPlaylist, {})
  @JoinColumn({ name: 'playlist_id' })
  public playlist: PlaylistEntity;
}
