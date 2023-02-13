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
      .leftJoinAndSelect('audio.files', 'files')
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
      .leftJoinAndSelect('audio.files', 'file')
      .leftJoinAndSelect('audio.artist', 'artist');
    if (dto.name) queryBuilder.where('LOWER(audio.name) like :name', { name: `%${dto.name}%` }).orderBy('audio.created_at', 'DESC').getMany()

    if (dto.status) queryBuilder.andWhere('audio.status = :audioStatus', { audioStatus: dto.status }).orderBy('audio.created_at', 'DESC')

    if (dto.playlistId) queryBuilder.andWhere('audio_playlist.playlist_id = :playlistId', { playlistId: dto.playlistId, }).orderBy('audio.created_at', 'DESC')

    if (dto.artistId) queryBuilder.andWhere('artist.id = :artistId', { artistId: dto.artistId, }).orderBy('audio.created_at', 'DESC')
    return paginate<AudioEntity>(queryBuilder, option);
  }
  async createAudio(dto: CreateAudioDTO): Promise<AudioEntity> {
    const audioPlaylists = dto.playlistId.map((playlistId) => {
      const audioPlaylist = new AudioPlaylistEntity();
      if (!playlistId) {
        ErrorHelper.NotFoundException(ERROR_MESSAGE.PLAYLIST.NOT_FOUND);
      }
      audioPlaylist.playlistId = playlistId;
      return audioPlaylist;
    });
    const artist = await this.entityManage.findOne(ArtistEntity, {
      where: { id: dto.artistId },
    });
    if (!artist) {
      ErrorHelper.NotFoundException(ERROR_MESSAGE.USER.NOT_FOUND);
    }
    const entity = this.audioRepository.save({
      ...dto,
      audioPlaylist: audioPlaylists,
      artistId: artist
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
}
