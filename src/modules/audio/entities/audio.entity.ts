import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { FileEntity } from 'src/modules/files/entities/file.entity';
import { AudioPlaylistEntity } from '../../audioPlaylist/entities/audioPlaylist.entity';
import { AudioGenreEntity } from 'src/modules/audioGenre/entities/audioGenre.entities';
import { HistoryEntity } from 'src/modules/history/entities/history.entity';
import { AccessEntity } from 'src/modules/access/entities/access.entity';
import ArtistEntity from 'src/modules/artist/entities/artist.entity';
import { AudioStatus } from 'src/common/enums/audioStatus.enum';
import { AudioFileEntity } from 'src/modules/audioFile/entities/audioFile.entity';

@Entity('audio')
export class AudioEntity extends BaseEntity {
  @Column()
  public name: string;

  @Column({ name: 'image_url' })
  public imageUrl: string;

  @Column({
    type: 'enum',
    enum: AudioStatus,
  })
  public status: AudioStatus;

  @Column()
  public length: number;

  @Column({ default: 0 })
  public liked: number;

  @OneToMany(
    () => AudioPlaylistEntity,
    (audioPlaylist) => audioPlaylist.audio,
    { cascade: true },
  )
  public audioPlaylist: AudioPlaylistEntity[];

  @OneToMany(() => AudioGenreEntity, (audioGenre) => audioGenre.audio, {
    cascade: true,
  })
  public audioGenre: AudioGenreEntity[];

  @OneToMany(() => HistoryEntity, (history) => history.audio, {
    cascade: true,
  })
  history: HistoryEntity[];

  @OneToMany(() => AccessEntity, (access) => access.audioId, { cascade: true })
  access: AccessEntity[];

  @OneToMany(() => AudioFileEntity, (audioFile) => audioFile.audio, {
    cascade: true,
  })
  audioFile: AudioFileEntity[];

  @ManyToOne(() => ArtistEntity, (artist) => artist.audios)
  @JoinColumn({ name: 'artist_id' })
  public artist: ArtistEntity;
}
