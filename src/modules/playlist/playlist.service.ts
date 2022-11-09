import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ERROR_MESSAGE } from "src/common/constants/messages.constant";
import { ErrorHelper } from "src/helpers/error.helper";
import { DeepPartial, Repository } from "typeorm";
import CreatePlaylistDto from "./dto/createPlaylist.dto";
import PlaylistDto from "./dto/playlist.dto";
import SearchPlaylistDto from "./dto/searchPlaylistDto";
import UpdatePlaylistDto from "./dto/updatePlaylist.dto";
import { Playlist } from "./entities/playlist.entity";
import { PlaylistStatus } from "./enum/playlistStatus.enum";

@Injectable()
export default class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>
  ) { }

  async findPlaylistById(playlistId: number): Promise<Playlist> {

    const playList = await this.playlistRepository.findOneBy({ id: playlistId })
    if (!playList) ErrorHelper.NotFoundExeption(ERROR_MESSAGE.PLAY_LIST.NOT_FOUND)
    return playList
  }
  async findPlaylist(dto: SearchPlaylistDto): Promise<Playlist[]> {
    const entity = await this
      .playlistRepository
      .createQueryBuilder("playlist")
      .where("LOWER(playlist.name) like :name", { name: `%${dto.name}%` })
      .orWhere("playlist.playlist_status = :playlistStatus", { playlistStatus: dto.playlist_status })
      .orderBy("playlist.created_at", "DESC")
      .getMany()
    return entity;
  }

  async createPlaylist(dto: CreatePlaylistDto): Promise<Playlist> {
    const entity = this.playlistRepository.create({ ...dto })
    return entity;
  }

  async updatePlaylist(playlistId: number, dto: UpdatePlaylistDto): Promise<Playlist> {
    const playlist = await this.playlistRepository.findOneBy({ id: playlistId })
    if (!playlist) ErrorHelper.NotFoundExeption(ERROR_MESSAGE.PLAY_LIST.NOT_FOUND)
    const playListDL: DeepPartial<Playlist> = {
      image_url: dto.image_url,
      name: dto.name,
      description: dto.description,
      status: dto.status
    }
    await this.playlistRepository.save({
      ...dto, playListDL
    })
    return playlist
  }

  async deletePlaylist(PlaylistId: number): Promise<Playlist> {
    const entity = await this.playlistRepository.findOne
      ({
        where: { id: PlaylistId }
      })
    if (entity) {
      entity.status = PlaylistStatus.INACTIVE;
      await this.playlistRepository.save(entity)
    }
    return entity;
  }
}
