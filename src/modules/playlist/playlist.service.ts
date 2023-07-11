/* eslint-disable prettier/prettier */
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

@Injectable()
export default class PlaylistService {
  constructor(
    private readonly entityManage: EntityManager,
    @InjectRepository(PlaylistEntity)
    private playlistRepository: Repository<PlaylistEntity>,
  ) { }

  async findPlaylistById(playlistId: number): Promise<PlaylistEntity> {
    const playList = await this.playlistRepository
      .createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.audioPlaylist', 'audio_playlist')
      .leftJoinAndSelect('audio_playlist.audio', 'audio')
      .leftJoinAndSelect('audio.audioFile', 'audioFile')
      .leftJoinAndSelect('audioFile.file', 'file')
      .leftJoinAndSelect('audio.artist', 'artist')
      .where('playlist.id = :playlistId', { playlistId: playlistId })
      .getOne();
    if (!playList)
      ErrorHelper.NotFoundException(ERROR_MESSAGE.PLAYLIST.NOT_FOUND);
    return playList;
  }
  async findPlaylist(
    option: IPaginationOptions,
    dto: SearchPlaylistDto,
  ): Promise<Pagination<PlaylistEntity>> {
    const queryBuilder = this.playlistRepository
      .createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.audioPlaylist', 'audio_playlist')
      .leftJoinAndSelect('audio_playlist.audio', 'audio')
      .leftJoinAndSelect('audio.audioFile', 'audioFile')
      .leftJoinAndSelect('audioFile.file', 'file')
      .leftJoinAndSelect('audio.artist', 'artist');
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
        .orderBy('playlist.created_at', 'DESC');
    queryBuilder.orderBy('playlist.created_at', 'DESC');
    return paginate<PlaylistEntity>(queryBuilder, option);
  }

  async createPlaylist(
    dto: CreatePlaylistDto,
    token: string,
  ): Promise<PlaylistEntity> {
    let authorId = getUserId(token);
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
