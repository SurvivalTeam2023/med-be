/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
import { AudioPlaylistEntity } from '../playlistAudio/entities/audioPlaylist.entity';

@Injectable()
export default class AudioService {
  constructor(
    @InjectRepository(AudioEntity)
    private audioRepository: Repository<AudioEntity>,
  ) {}

  async findAudioById(audioId: number): Promise<AudioEntity> {
    const entity = await this.audioRepository
      .createQueryBuilder('audio')
      .select(['audio', 'audio_playlist.playlist_id'])
      .leftJoin('audio.audio_playlist', 'audio_playlist')
      .where('audio.id = :audioId', { audioId })
      .getOne();
    if (!entity) {
      ErrorHelper.NotFoundExeption(ERROR_MESSAGE.AUDIO.NOT_FOUND);
    }

    return entity;
  }
  async findAudios(
    dto: SearchAudioDTO,
    option: IPaginationOptions,
  ): Promise<Pagination<AudioEntity>> {
    const querybuilder = await this.audioRepository
      .createQueryBuilder('audio')
      .leftJoinAndSelect('audio.audioPlaylist', 'audio_playlist');
    if (dto.name)
      querybuilder
        .orWhere('LOWER(audio.name) like :name', { name: `%${dto.name}%` })
        .orWhere('audio.status = :audioStatus', { audioStatus: dto.status })
        .orWhere('audio_playlist.playlist_id = :playlistId', {
          playlistId: dto.playlist_id,
        })
        .orderBy('audio.created_at', 'DESC');
    return paginate<AudioEntity>(querybuilder, option);
  }
  async createAudio(dto: CreateAudioDTO): Promise<AudioEntity> {
    const audioPlaylists = dto.playlistId.map((playlistId) => {
      const audioPlaylist = new AudioPlaylistEntity();
      if (!playlistId) {
        ErrorHelper.NotFoundExeption(ERROR_MESSAGE.PLAYLIST.NOT_FOUND);
      }
      audioPlaylist.playlistId = playlistId;
      return audioPlaylist;
    });
    const entity = this.audioRepository.save({
      ...dto,
      audioPlaylist: audioPlaylists,
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
    if (!audio) ErrorHelper.NotFoundExeption(ERROR_MESSAGE.AUDIO.NOT_FOUND);

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
