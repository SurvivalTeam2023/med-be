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
  public length: string;

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

  @OneToOne(() => FileEntity, (file) => file.audio, {
    cascade: true,
  })
  @JoinColumn({ name: 'file_id' })
  public file: FileEntity;

  @OneToMany(() => HistoryEntity, (history) => history.audioId, {
    cascade: true,
  })
  history: HistoryEntity[];

  @OneToMany(() => AccessEntity, (access) => access.audioId, { cascade: true })
  access: AccessEntity[];

  @ManyToOne(() => ArtistEntity, (artist) => artist.audios)
  @JoinColumn({ name: 'artist_id' })
  public artist: ArtistEntity;
}
