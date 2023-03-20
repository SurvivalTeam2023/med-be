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
import UserEntity from '../user/entities/user.entity';
import { FollowerEntity } from '../follower/entities/follower.entity';

@Injectable()
export default class PlaylistService {
  constructor(
    private readonly entityManage: EntityManager,
    @InjectRepository(PlaylistEntity)
    private playlistRepository: Repository<PlaylistEntity>,
  ) {}

  async findPlaylistById(playlistId: number): Promise<PlaylistEntity> {
    const playList = await this.playlistRepository
      .createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.audioPlaylist', 'audio_playlist')
      .leftJoinAndSelect('audio_playlist.audio', 'audio')
      .leftJoinAndSelect('audio.file', 'files')
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
      .leftJoinAndSelect('playlist.follower', 'follower')
      .select(['playlist', 'follower.author_id']);
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
        .andWhere('follower.author_id = :authorId', { authorId: dto.authorId })
        .orderBy('playlist.created_at', 'DESC');
    queryBuilder.orderBy('playlist.created_at', 'DESC');
    return paginate<PlaylistEntity>(queryBuilder, option);
  }

  async createPlaylist(
    dto: CreatePlaylistDto,
    token: string,
  ): Promise<PlaylistEntity> {
    let authorId = getUserId(token);
    const follower = new FollowerEntity();
    follower.authorId = authorId;
    const playlist = await this.playlistRepository.save({
      ...dto,
      status: PlaylistStatus.ACTIVE,
      follower: follower,
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

  async deletePlaylist(PlaylistId: number): Promise<PlaylistEntity> {
    const entity = await this.playlistRepository.findOne({
      where: { id: PlaylistId },
    });
    if (entity) {
      entity.status = PlaylistStatus.INACTIVE;
      await this.playlistRepository.save(entity);
    }
    return entity;
  }
}
