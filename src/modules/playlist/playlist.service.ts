import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import { ErrorHelper } from 'src/helpers/error.helper';
import { EntityManager, Repository } from 'typeorm';
import CreatePlaylistDto from './dto/createPlaylist.dto';
import SearchPlaylistDto from './dto/searchPlaylistDto';
import UpdatePlaylistDto from './dto/updatePlaylist.dto';
import { PlaylistEntity } from './entities/playlist.entity';
import { PlaylistStatus } from '../../common/enums/playlistStatus.enum';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { getUserId } from 'src/utils/decode.utils';
import { PlaylistPublic } from 'src/common/enums/playlistPublic.enum';
import GenreService from '../genre/genre.services';
import { PlaylistType } from 'src/common/enums/playlistType.enum';
import { PlaylistDTO } from './dto/playlist.dto';
import AudioDTO from '../audio/dto/audio.dto';
import UserEntity from '../user/entities/user.entity';
import { AudioPlaylistEntity } from '../audioPlaylist/entities/audioPlaylist.entity';
import { AudioUserEntity } from '../audioUser/entities/audioUser.entity';

@Injectable()
export default class PlaylistService {
  constructor(
    private readonly entityManage: EntityManager,
    @InjectRepository(PlaylistEntity)
    private playlistRepository: Repository<PlaylistEntity>,
  ) { }

  async findPlaylistById(playlistId: number, token: string): Promise<PlaylistDTO> {
    const userId = getUserId(token)
    const playList = await this.playlistRepository
      .createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.audioPlaylist', 'audio_playlist')
      .leftJoinAndSelect('audio_playlist.audio', 'audio')
      .leftJoinAndSelect('audio.audioFile', 'audioFile')
      .leftJoinAndSelect('audioFile.file', 'file')
      .innerJoinAndMapOne('playlist.author', UserEntity, 'user', 'user.id=playlist.author_id')
      .where('playlist.id = :playlistId', { playlistId: playlistId })
      .getOne();
    if (!playList)
      ErrorHelper.NotFoundException(ERROR_MESSAGE.PLAYLIST.NOT_FOUND);
    let isLiked: boolean
    const audioPlaylist = await Promise.all(playList.audioPlaylist.map(async e => {
      const audioUser = await this.entityManage.findOne(AudioUserEntity, {
        where: {
          userId: userId,
          audioId: e.audioId
        }
      })
      isLiked = !!audioUser
      const audioPlaylist = {
        id: e.id,
        audio: {
          id: e.audioId,
          name: e.audio.name,
          imageUrl: e.audio.imageUrl,
          status: e.audio.status,
          liked: e.audio.liked,
          audioFile: e.audio.audioFile,
          isLiked: isLiked
        }
      }
      return audioPlaylist

    }))

    const plalistDTO: PlaylistDTO = {
      ...playList,
      audioPlaylist: audioPlaylist,
      author: {
        firstName: playList['author.firstName'],
        lastName: playList['author.lastName']
      }
    }
    return plalistDTO;
  }
  async findPlaylist(
    dto: SearchPlaylistDto, token: string
  ): Promise<Pagination<PlaylistDTO>> {
    const userId = getUserId(token)
    const queryBuilder = await this.playlistRepository
      .createQueryBuilder('playlist')
      .leftJoin('playlist.audioPlaylist', 'audio_playlist')
      .leftJoin('playlist.genre', 'genre')
      .leftJoin('audio_playlist.audio', 'audio')
      .leftJoin('audio.audioFile', 'audioFile')
      .leftJoin('audioFile.file', 'file')
      .innerJoinAndMapOne('playlist.author', UserEntity, 'user', 'user.id=playlist.author_id')
      .groupBy('playlist.id')
      .select(['playlist', 'user.firstName', 'user.lastName',]);
    if (dto.name)
      queryBuilder
        .where('LOWER(playlist.name) like :name', { name: `%${dto.name}%` })
        .orderBy('playlist.created_at', 'DESC');
    if (dto.status)
      queryBuilder
        .andWhere('playlist.status = :playlistStatus', {
          playlistStatus: dto.status,
        })
        .orderBy('playlist.created_at', 'DESC');
    if (dto.authorId)
      queryBuilder
        .andWhere('playlist.author_id = :authorId', { authorId: dto.authorId })
        .orderBy('playlist.created_at', 'DESC');
    if (dto.playListType)
      queryBuilder
        .andWhere('playlist.playlist_type = :playlistType', {
          playlistType: dto.playListType,
        })
    if (dto.genreId)
      queryBuilder
        .andWhere('genre.id = :genreId', {
          genreId: dto.genreId,
        })
        .orderBy('playlist.created_at', 'DESC');

    const results = await paginate(queryBuilder, { page: dto.page, limit: dto.limit });

    const playlist = await Promise.all(results.items.map(async (item) => {

      const audioPlaylist = await this.entityManage
        .createQueryBuilder(AudioPlaylistEntity, 'audioPlaylist')
        .leftJoinAndSelect('audioPlaylist.audio', 'audio')
        .leftJoinAndSelect('audio.audioFile', 'audioFile')
        .leftJoinAndSelect('audioFile.file', 'file')
        .where('audioPlaylist.playlist_id = :playlistId', { playlistId: item.id })
        .getMany()

      const ap = await Promise.all(audioPlaylist.map(async e => {
        const audioUser = await this.entityManage.findOne(AudioUserEntity, {
          where: {
            userId: userId,
            audioId: e.audioId
          }
        })
        const isLiked = !!audioUser
        const audioPlaylist = {
          id: e.id,
          audio: {
            id: e.audioId,
            name: e.audio.name,
            imageUrl: e.audio.imageUrl,
            status: e.audio.status,
            liked: e.audio.liked,
            audioFile: e.audio.audioFile,
            isLiked: isLiked
          }
        }
        return audioPlaylist
      }))
      const playListDTO: PlaylistDTO = {
        ...item,
        author: item['author'],
        audioPlaylist: ap
      }
      return playListDTO
    }))


    return {
      ...results,
      items: playlist
    }
  }

  async createPlaylist(
    dto: CreatePlaylistDto,
    token: string,
  ): Promise<PlaylistEntity> {
    const authorId = getUserId(token);
    const playlist = await this.playlistRepository.save({
      ...dto,
      status: PlaylistStatus.ACTIVE,
      authorId: authorId,
    });
    return playlist;
  }

  async updatePlaylist(
    playlistId: number,
    dto: UpdatePlaylistDto,
  ): Promise<PlaylistEntity> {
    const playlist = await this.playlistRepository.findOneBy({
      id: playlistId,
    });
    if (!playlist)
      ErrorHelper.NotFoundException(ERROR_MESSAGE.PLAYLIST.NOT_FOUND);

    const updatedPlaylist = await this.playlistRepository.save({
      id: playlist.id,
      ...dto,
    });
    return updatedPlaylist;
  }

  async deletePlaylist(playlistId: number): Promise<PlaylistEntity> {
    const entity = await this.playlistRepository.findOne({
      where: { id: playlistId },
    });
    if (entity) {
      entity.status = PlaylistStatus.INACTIVE;
      await this.playlistRepository.save(entity);
    }
    return entity;
  }

  async setPublicPlaylist(
    playlistId: number,
    publicStatus: PlaylistPublic,
  ): Promise<PlaylistEntity> {
    const playlist = await this.playlistRepository.findOne({
      where: { id: playlistId },
    });
    playlist.isPublic = publicStatus;
    await this.playlistRepository.save(playlist);
    return playlist;
  }


}

