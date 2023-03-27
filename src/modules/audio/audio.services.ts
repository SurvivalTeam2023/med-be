/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { AudioEntity } from './entities/audio.entity';
import { AudioStatus } from '../../common/enums/audioStatus.enum';
import { CreateAudioDTO } from './dto/createAudio.dto';
import { ErrorHelper } from 'src/helpers/error.helper';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import SearchAudioDTO from './dto/searchAudio.dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import UpdateAudioDTO from './dto/updateAudio.dto';
import ArtistEntity from '../artist/entities/artist.entity';
import { AudioPlaylistEntity } from '../audioPlaylist/entities/audioPlaylist.entity';
import { PlaylistEntity } from '../playlist/entities/playlist.entity';
import { GenreEntity } from '../genre/entities/genre.entity';
import { AudioGenreEntity } from '../audioGenre/entities/audioGenre.entities';
import { getUserId } from 'src/utils/decode.utils';

@Injectable()
export default class AudioService {
  constructor(
    private readonly entityManage: EntityManager,
    @InjectRepository(AudioEntity)
    private audioRepository: Repository<AudioEntity>,
  ) { }

  async findAudioById(audioId: number): Promise<AudioEntity> {
    const entity = await this.audioRepository
      .createQueryBuilder('audio')
      .leftJoinAndSelect('audio.audioPlaylist', 'audio_playlist')
      .leftJoinAndSelect('audio.file', 'files')
      .leftJoinAndSelect('audio.artist', 'artist')
      .where('audio.id = :audioId', { audioId })
      .getOne();
    if (!entity) {
      ErrorHelper.NotFoundException(ERROR_MESSAGE.AUDIO.NOT_FOUND);
    }

    return entity;
  }
  async findAudios(
    dto: SearchAudioDTO,
    option: IPaginationOptions,
  ): Promise<Pagination<AudioEntity>> {
    const queryBuilder = this.audioRepository
      .createQueryBuilder('audio')
      .leftJoinAndSelect('audio.audioPlaylist', 'audio_playlist')
      .leftJoinAndSelect('audio.file', 'file')
      .leftJoinAndSelect('audio.artist', 'artist');
    if (dto.name) queryBuilder.where('LOWER(audio.name) like :name', { name: `%${dto.name}%` }).orderBy('audio.created_at', 'DESC')

    if (dto.status) queryBuilder.andWhere('audio.status = :audioStatus', { audioStatus: dto.status }).orderBy('audio.created_at', 'DESC')

    if (dto.playlistId) queryBuilder.andWhere('audio_playlist.playlist_id = :playlistId', { playlistId: dto.playlistId, }).orderBy('audio.created_at', 'DESC')

    if (dto.artistId) queryBuilder.andWhere('artist.id = :artistId', { artistId: dto.artistId, }).orderBy('audio.created_at', 'DESC')
    queryBuilder.orderBy('audio.created_at', 'DESC')
    return paginate<AudioEntity>(queryBuilder, option);
  }
  async createAudio(dto: CreateAudioDTO, token: string): Promise<AudioEntity> {
    const audioPlaylists = dto.playlistId.map((playlistId) => {
      const audioPlaylist = new AudioPlaylistEntity();
      audioPlaylist.playlistId = playlistId;
      return audioPlaylist;
    });
    let userId = getUserId(token);
    const artist = await this.entityManage.findOne(ArtistEntity, {
      where: { id: userId },
    });
    if (!artist) {
      ErrorHelper.NotFoundException(ERROR_MESSAGE.USER.NOT_FOUND);
    }
    const audioGenres = dto.genreId.map((genreId) => {
      const audioGenre = new AudioGenreEntity();
      audioGenre.genreId = genreId;
      return audioGenre;
    });
    const entity = this.audioRepository.save({
      ...dto,
      audioPlaylist: audioPlaylists,
      artist: artist,
      audioGenre: audioGenres
    });
    return entity;
  }
  async updateAudio(
    audioId: number,
    dto: UpdateAudioDTO,
  ): Promise<AudioEntity> {
    const audio = await this.audioRepository.findOneBy({
      id: audioId,
    });
    if (!audio) ErrorHelper.NotFoundException(ERROR_MESSAGE.AUDIO.NOT_FOUND);

    const updatedAudio = await this.audioRepository.save({
      id: audio.id,
      ...dto,
    });
    return updatedAudio;
  }

  async deleteAudio(audioId: number): Promise<AudioEntity> {
    const entity = await this.audioRepository.findOne({
      where: { id: audioId },
    });
    if (entity) {
      entity.status = AudioStatus.INACTIVE;
      await this.audioRepository.save(entity);
    }
    return entity;
  }
  async countAudio(): Promise<number> {
    return this.audioRepository.count()
  }
}
