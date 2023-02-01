/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import { ErrorHelper } from 'src/helpers/error.helper';
import { Repository } from 'typeorm';
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

@Injectable()
export default class PlaylistService {
  constructor(
    @InjectRepository(PlaylistEntity)
    private playlistRepository: Repository<PlaylistEntity>,
  ) { }

  async findPlaylistById(playlistId: number): Promise<PlaylistEntity> {
    const playList = await this.playlistRepository.findOneBy({
      id: playlistId,
    });
    if (!playList)
      ErrorHelper.NotFoundExeption(ERROR_MESSAGE.PLAYLIST.NOT_FOUND);
    return playList;
  }
  async findPlaylist(
    option: IPaginationOptions,
    dto: SearchPlaylistDto,
  ): Promise<Pagination<PlaylistEntity>> {
    const querybuilder = await this.playlistRepository
      .createQueryBuilder('playlist')
    if (dto.name) querybuilder.where('LOWER(playlist.name) like :name', { name: `%${dto.name}%` })
    if (dto.status) querybuilder.andWhere('playlist.status = :playlistStatus', { playlistStatus: dto.status, })
    if (dto.userId) querybuilder.andWhere('playlist.user_id = :userId', { userId: dto.userId, })
      .orderBy('playlist.created_at', 'DESC');
    return paginate<PlaylistEntity>(querybuilder, option);
  }

  async createPlaylist(dto: CreatePlaylistDto): Promise<PlaylistEntity> {
    const entity = await this.playlistRepository.save({ ...dto });
    return entity;
  }

  async updatePlaylist(
    playlistId: number,
    dto: UpdatePlaylistDto,
  ): Promise<PlaylistEntity> {
    const playlist = await this.playlistRepository.findOneBy({
      id: playlistId,
    });
    if (!playlist)
      ErrorHelper.NotFoundExeption(ERROR_MESSAGE.PLAYLIST.NOT_FOUND);

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
