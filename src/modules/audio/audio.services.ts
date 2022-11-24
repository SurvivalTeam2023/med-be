import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AudioPlaylist from 'src/modules/audioPlaylist/entities/audioPlaylist.entity';
import { Repository } from 'typeorm';
import { Audio } from './entities/audio.entity';
import { AudioStatus } from './enum/audioStatus.enum';
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

@Injectable()
export default class AudioService {
  constructor(
    @InjectRepository(Audio)
    private audioRepository: Repository<Audio>,
    @InjectRepository(AudioPlaylist)
    private audioPlaylistRepository: Repository<AudioPlaylist>,
  ) {}

  async findAudioById(audioId: number): Promise<Audio> {
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
    option: IPaginationOptions,
    dto: SearchAudioDTO,
  ): Promise<Pagination<Audio>> {
    const querybuilder = await this.audioRepository
      .createQueryBuilder('audio')
      .leftJoinAndSelect('audio.audio_playlist', 'audio_playlist');
    if (dto.name)
      querybuilder
        .orWhere('LOWER(audio.name) like :name', { name: `%${dto.name}%` })
        .orWhere('audio.status = :audioStatus', { audioStatus: dto.status })
        .orWhere('audio_playlist.playlist_id = :playlistId', {
          playlistId: dto.playlist_id,
        })
        .orderBy('audio.created_at', 'DESC');
    if (dto.name)
      querybuilder.orWhere('LOWER(audio.name) like :name', {
        name: `%${dto.name}%`,
      });
    return paginate<Audio>(querybuilder, option);
  }
  async createAudio(dto: CreateAudioDTO): Promise<Audio> {
    const audioPlaylists = dto.playlist_id.map((playlistId) => {
      const audioPlaylist = new AudioPlaylist();
      audioPlaylist.playlist_id = playlistId;
      return audioPlaylist;
    });
    const entity = this.audioRepository.save({
      ...dto,
      audio_playlist: audioPlaylists,
    });
    return entity;
  }
  async updateAudio(audioId: number, dto: UpdateAudioDTO): Promise<Audio> {
    const audio = await this.audioRepository.findOneBy({
      id: audioId,
    });
    if (!audio) ErrorHelper.NotFoundExeption(ERROR_MESSAGE.AUDIO.NOT_FOUND);

    const updatedAUdio = await this.audioRepository.save({
      id: audio.id,
      ...dto,
    });
    return updatedAUdio;
  }

  async deleteAudio(audioId: number): Promise<Audio> {
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
