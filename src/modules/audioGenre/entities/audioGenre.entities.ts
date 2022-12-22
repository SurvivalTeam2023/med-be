import {  Entity, JoinColumn, ManyToOne, } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { AudioEntity } from 'src/modules/audio/entities/audio.entity';
import { GenreEntity } from 'src/modules/genre/entities/genre.entity';

@Entity('audio_genre')
export class AudioGenreEntity extends BaseEntity {

    @ManyToOne(() => AudioEntity, (audio) => audio.audioGenre)
    @JoinColumn({ name: 'audio_id' })
    public audio: AudioEntity;
  
    @ManyToOne(() => GenreEntity, (genre) => genre.audioGenre)
    @JoinColumn({ name: 'genre_id' })
    public genre: GenreEntity;
}
