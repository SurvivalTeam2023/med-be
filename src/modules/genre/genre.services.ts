import { Emotion } from '@aws-sdk/client-rekognition';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import { EmotionEnum } from 'src/common/enums/emotion.enum';
import { GenreStatus } from 'src/common/enums/genreStatus.enum';
import { ErrorHelper } from 'src/helpers/error.helper';
import { EntityManager, Repository } from 'typeorm';
import { AudioGenreEntity } from '../audioGenre/entities/audioGenre.entities';
import AddGenreToAudioDTO from './dto/addGenreToAudio.dto';
import CreateGenreDTO from './dto/createGenre.dto';
import UpdateGenreDTO from './dto/updateGenre.dto';
import { GenreEntity } from './entities/genre.entity';
import { ResultEntity } from '../result/entities/result.entity';
import { QuestionEntity } from '../question/entities/question.entity';
import { MentalHealthEntity } from '../mentalHealth/entities/mentalHealth.entity';
import { OptionEntity } from '../option/entities/option.entity';
import { QuestionMentalHealthEntity } from '../questionMentalHealth/entities/questionMentalHealth.entity';
import { PlaylistPublic } from 'src/common/enums/playlistPublic.enum';
import UserEntity from '../user/entities/user.entity';
import ArtistEntity from '../artist/entities/artist.entity';
import PlaylistDto from '../playlist/dto/playlist.dto';
import GenreDTO from './dto/genre.dto';

@Injectable()
export default class GenreService {
  constructor(
    private readonly entityManage: EntityManager,
    @InjectRepository(GenreEntity)
    private genreRepo: Repository<GenreEntity>,
  ) { }

  async createGenre(dto: CreateGenreDTO): Promise<GenreEntity> {
    const newGenre = this.genreRepo.save({
      ...dto,
    });
    return newGenre;
  }

  async findGenreById(genreId: number): Promise<any> {

    const genre = await this.genreRepo
      .createQueryBuilder('genre')
      .leftJoinAndSelect('genre.audioGenre', 'audioGenre')
      .leftJoinAndSelect('audioGenre.audio', 'audio')
      .leftJoinAndSelect('genre.playlist', 'playlist')
      .select(['genre', 'playlist'])
      .where('genre.id = :genreId', { genreId: genreId })
      .andWhere('playlist.is_public = :isPublic', { isPublic: PlaylistPublic.PUBLIC })
      .getOne()
    const playlists = await Promise.all(
      genre.playlist.map(async (playlist) => {
        const user = await this.entityManage.findOne(UserEntity, {
          where: {
            id: playlist.authorId,
          },
        });
        return { playlist, author: user.firstName + " " + user.lastName };
      })
    );

    const genreDTO: GenreDTO = {
      id: genre.id,
      name: genre.name,
      emotion: genre.emotion,
      playlists: playlists
    }
    return genreDTO
  }

  async findGenres(name?: string): Promise<GenreEntity[]> {
    const queryBuilder = await this.genreRepo
      .createQueryBuilder('genre')
      .leftJoinAndSelect('genre.audioGenre', 'audioGenre')
      .leftJoinAndSelect('audioGenre.audio', 'audio')
      .leftJoinAndSelect('genre.playlist', 'playlist')
      .select(['genre', 'audioGenre.id', 'audio']);
    if (name)
      queryBuilder
        .where('LOWER(genre.name) like :name', { name: `%${name}%` })
        .orderBy('genre.name', 'ASC');

    return queryBuilder.orderBy('genre.name', 'ASC').getMany();
  }
  async updateGenre(
    genreId: number,
    dto: UpdateGenreDTO,
  ): Promise<GenreEntity> {
    const genre = await this.findGenreById(genreId);
    if (!genre) ErrorHelper.NotFoundException(ERROR_MESSAGE.GENRE.NOT_FOUND);

    const updatedGenre = await this.genreRepo.save({
      id: genre.id,
      ...dto,
    });
    return updatedGenre;
  }

  async deleteGenre(genreId: number): Promise<GenreEntity> {
    const genre = await this.findGenreById(genreId);
    if (!genre) ErrorHelper.NotFoundException(ERROR_MESSAGE.GENRE.NOT_FOUND);
    const updatedGenre = this.genreRepo.save({
      id: genre.id,
      status: GenreStatus.INACTIVE,
    });
    return updatedGenre;
  }
  async getGenreByEmotion(emotions: Emotion[]): Promise<GenreEntity[]> {
    const genre = await this.genreRepo
      .createQueryBuilder('genre')
      .leftJoinAndSelect('genre.audioGenre', 'audioGenre')
      .leftJoinAndSelect('audioGenre.audio', 'audio')
      .select(['genre', 'audioGenre.id', 'audio'])
      .where('genre.emotion like :emotion', {
        emotion: `%${emotions[0].Type}%`,
      })
      .orderBy('genre.name', 'ASC')
      .getMany();
    return genre;
  }
}
