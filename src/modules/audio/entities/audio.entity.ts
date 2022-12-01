import AudioPlaylist from 'src/modules/audio/entities/audioPlaylist.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { AudioStatus } from '../enum/audioStatus.enum';
import { BaseEntity } from '../../../common/base/base.entity';
import { File } from 'src/modules/files/entities/file.entity';

@Entity('audio')
export class Audio extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public image_url: string;

  @Column()
  public status: AudioStatus;

  @Column()
  public length: string;

  @OneToMany(() => AudioPlaylist, (audio_playlist) => audio_playlist.audio, {
    cascade: true,
  })
  public audio_playlist: AudioPlaylist[];

  @OneToMany(() => File, (file) => file.audio, {
    cascade: true,
  })
  public files: File[];
}
