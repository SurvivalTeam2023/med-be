import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AudioGenreEntity } from './entities/audioGenre.entities';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class AudioGenreService {
  constructor(
    @InjectRepository(AudioGenreEntity)
    private audioGenreRepo: Repository<AudioGenreEntity>,
    private readonly entityManage: EntityManager,
  ) {}

  async findAudioGenre(genreId: number): Promise<AudioGenreEntity[]> {
    const querybuilder = this.audioGenreRepo
      .createQueryBuilder('audio_genre')
      .leftJoinAndSelect('audio_genre.genre', 'genre')
      .leftJoinAndSelect('audio_genre.audio', 'audio')
      .leftJoinAndSelect('audio.artist', 'artist')
      .leftJoinAndSelect('audio.file', 'file')
      .where('audio_genre.genre = :genre_id', { genre_id: genreId })
      .getMany();

    return querybuilder;
  }
}
