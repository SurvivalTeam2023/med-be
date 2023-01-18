/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import { GenreStatus } from 'src/common/enums/genreStatus.enum';
import { ErrorHelper } from 'src/helpers/error.helper';
import { Repository } from 'typeorm';
import { AudioGenreEntity } from '../audioGenre/entities/audioGenre.entities';
import AddGenreToAudioDTO from './dto/addGenreToAudio.dto';
import CreateGenreDTO from './dto/createGenre.dto';
import UpdateGenreDTO from './dto/updateGenre.dto';
import { GenreEntity } from './entities/genre.entity';

@Injectable()
export default class GenreService {
  constructor(
    @InjectRepository(GenreEntity)
    private genreRepo: Repository<GenreEntity>,
  ) {}

  async createGenre(dto: CreateGenreDTO): Promise<GenreEntity> {
    const newGenre = this.genreRepo.save({
      ...dto,
    });
    return newGenre;
  }

  async addGenreToAudio(dto: AddGenreToAudioDTO): Promise<GenreEntity> {
    const genre = await this.genreRepo.findOneBy({
      id: dto.genreId,
    });
    const audioGenres = dto.audioIds.map((audioId) => {
      const audioGenre = new AudioGenreEntity();
      audioGenre.audioId = audioId;
      return audioGenre;
    });

    const updatedGenre = this.genreRepo.save({
      id: genre.id,
      audioGenre: audioGenres,
    });
    return updatedGenre;
  }

  async findGenreById(genreId: number): Promise<GenreEntity> {
    const genre = await this.genreRepo.findOneBy({
      id: genreId,
    });
    return genre;
  }

  async findGenres(): Promise<GenreEntity[]> {
    const genres = await this.genreRepo.find({
      
      order: {
        name: 'ASC',
      },
    });
    return genres;
  }
  async updateGenre(
    genreId: number,
    dto: UpdateGenreDTO,
  ): Promise<GenreEntity> {
    const genre = await this.findGenreById(genreId);
    if (!genre) ErrorHelper.NotFoundExeption(ERROR_MESSAGE.GENRE.NOT_FOUND);

    const updatedGenre = await this.genreRepo.save({
      id: genre.id,
      ...dto,
    });
    return updatedGenre;
  }

  async deleteGenre(genreId: number): Promise<GenreEntity> {
    const genre = await this.findGenreById(genreId);
    if (!genre) ErrorHelper.NotFoundExeption(ERROR_MESSAGE.GENRE.NOT_FOUND);
    const updatedGenre = this.genreRepo.save({
      id: genre.id,
      status: GenreStatus.INACTIVE,
    });
    return updatedGenre;
  }
}
