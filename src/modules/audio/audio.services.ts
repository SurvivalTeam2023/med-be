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
import { AudioPlaylistEntity } from '../audioPlaylist/entities/audioPlaylist.entity';
import { PlaylistEntity } from '../playlist/entities/playlist.entity';
import { AudioGenreEntity } from '../audioGenre/entities/audioGenre.entities';
import { getUserId } from 'src/utils/decode.utils';
import { PlaylistType } from 'src/common/enums/playlistType.enum';
import GenreService from '../genre/genre.services';
import { FilesService } from '../files/files.service';
import { FileEntity } from '../files/entities/file.entity';
import { AudioFileEntity } from '../audioFile/entities/audioFile.entity';
import UserEntity from '../user/entities/user.entity';
import AudioDTO from './dto/audio.dto';
import { AudioUserEntity } from '../audioUser/entities/audioUser.entity';
import { async } from 'rxjs';

@Injectable()
export default class AudioService {
  constructor(
    private readonly genreService: GenreService,
    private readonly fileService: FilesService,
    private readonly entityManage: EntityManager,
    @InjectRepository(AudioEntity)
    private audioRepository: Repository<AudioEntity>,
  ) { }

  async findAudioById(
    audioId: number,
    token: string,
  ): Promise<{ audio: AudioEntity; isLiked: boolean }> {
    let isLiked: boolean = false;
    const userId = getUserId(token);
    const audioUser = await this.entityManage.findOne(AudioUserEntity, {
      where: {
        userId: userId,
        audioId: audioId
      },
    });
    const audio = await this.audioRepository
      .createQueryBuilder('audio')
      .leftJoinAndSelect('audio.audioPlaylist', 'audio_playlist')
      .leftJoinAndSelect('audio.audioFile', 'audioFile')
      .leftJoinAndSelect('audioFile.file', 'file')
      .where('audio.id = :audioId', { audioId })
      .andWhere('audioFile.is_primary =  1')
      .getOne();

    if (!audio) {
      ErrorHelper.NotFoundException(ERROR_MESSAGE.AUDIO.NOT_FOUND);
    }

    if (audioUser) isLiked = true;

    return { audio: audio, isLiked: isLiked };
  }
  async findAudios(
    dto: SearchAudioDTO,
    option: IPaginationOptions,
    token: string,
  ): Promise<Pagination<AudioDTO>> {
    const userId = getUserId(token);

    const queryBuilder = this.audioRepository
      .createQueryBuilder('audio')
      .leftJoinAndSelect('audio.audioPlaylist', 'audioPlaylist')
      .leftJoinAndSelect('audioPlaylist.playlist', 'playlist')
      .leftJoinAndSelect('audio.audioFile', 'audioFile')
      .leftJoinAndSelect('audioFile.file', 'file')
      .groupBy('audio.id')
      .select(['audio'])
      .where('audioFile.is_primary =  1');
    if (dto.name)
      queryBuilder
        .where('LOWER(audio.name) like :name', { name: `%${dto.name}%` })
        .orderBy('audio.created_at', 'DESC');

    if (dto.status)
      queryBuilder
        .andWhere('audio.status = :audioStatus', { audioStatus: dto.status })
        .orderBy('audio.created_at', 'DESC');

    if (dto.playlistId)
      queryBuilder
        .andWhere('audioPlaylist.playlist_id = :playlistId', {
          playlistId: dto.playlistId,
        })
        .orderBy('audio.created_at', 'DESC');

    queryBuilder.orderBy('audio.created_at', 'DESC');
    const result = await paginate<AudioEntity>(queryBuilder, option);
    let isLiked: boolean
    const audios = await Promise.all(result.items.map(async (e) => {
      const audioUser = await this.entityManage.findOne(AudioUserEntity, {
        where: {
          userId: userId,
          audioId: e.id
        },
      });

      const audioFile = await this.entityManage.find(AudioFileEntity, {
        relations: {
          file: true
        },
        where: {
          audioId: e.id
        }
      })
      const audioPlaylist = await this.entityManage.find(AudioPlaylistEntity, {
        relations: {
          playlist: true
        },
        where: {
          audioId: e.id
        }
      })
      isLiked = !!audioUser;

      const audioDTO: AudioDTO = {
        id: e.id,
        imageUrl: e.imageUrl,
        liked: e.liked,
        name: e.name,
        status: e.status,
        audioFile: audioFile,
        audioPlaylist: audioPlaylist,
        isLiked: isLiked
      };
      return audioDTO;
    }))

    return {
      ...result,
      items: audios,
    };
  }
  async createAudio(dto: CreateAudioDTO, token: string): Promise<AudioEntity> {
    const userId = getUserId(token)

    const user = await this.entityManage.findOne(UserEntity, {
      where: {
        id: userId
      }
    })

    try {
      const audioGenres = dto.genreId.map((genreId) => {
        const audioGenre = new AudioGenreEntity();
        audioGenre.genreId = genreId;
        return audioGenre;
      });

      const audioFile = await this.entityManage.findOne(FileEntity, {
        where: {
          id: dto.audioFileId,
        },
      });

      const imageFile = await this.entityManage.findOne(FileEntity, {
        where: {
          id: dto.imageFileId,
        },
      });

      const file: FileEntity[] = [audioFile];
      const audioFiles = file.map((file) => {
        const audioFile = new AudioFileEntity();
        audioFile.file = file;
        audioFile.isPrimary = true;
        return audioFile;
      });

      const entityData = this.audioRepository.create({
        ...dto,
        status: AudioStatus.ACTIVE,
        audioGenre: audioGenres,
        audioFile: audioFiles,
        imageUrl: imageFile.url,
        artist: user.firstName
      });
      if (dto.playlistId) {
        const audioPlaylists = dto.playlistId.map((playlistId) => {
          const audioPlaylist = new AudioPlaylistEntity();
          audioPlaylist.playlistId = playlistId;
          return audioPlaylist;
        });
        entityData.audioPlaylist = audioPlaylists;
      }
      const entity = await this.audioRepository.save(entityData);
      return entity;
    } catch (error) {
      ErrorHelper.BadRequestException(error);
    }
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
    return this.audioRepository.count();
  }
}
