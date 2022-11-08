import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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
    const entity = await this
      .playlistRepository
      .createQueryBuilder("playlist")
      .where("playlist.id = :playlistId", { playlistId })
      .getOne()
    return entity;

  }
  async findPlaylist(dto: SearchPlaylistDto): Promise<Playlist[]> {
    const entity = await this
      .playlistRepository
      .createQueryBuilder("playlist")
      .where("playlist.name like :name", { name: `%${dto.name}%` })
      .orWhere("playlist.playlist_status = :playlistStatus", { playlistStatus: dto.playlist_status })
      .orderBy("playlist.created_at", "DESC")
      .getMany()
    // console.log(name,PlaylistStatus,playlistId)
    return entity;
  }

  async createPlaylist(dto: CreatePlaylistDto): Promise<Playlist> {
   const entity= new Playlist()
   entity.name=dto.name;
   entity.image_url=dto.image_url;
   entity.description=dto.description;
   entity.playlist_status=dto.playlist_status;
   entity.user_id=dto.user_id
   await this.playlistRepository.save(entity)
      return entity;
  }

  async updatePlaylist(playlistId: number, dto: UpdatePlaylistDto):Promise<Playlist> {
    const entity= await this.playlistRepository.findOne({
          where:{id:playlistId}
        })
        if(entity)
    
    entity.name=dto.name;
    entity.image_url=dto.image_url;
    entity.description=dto.description;
    entity.playlist_status=dto.playlist_status;
    await this.playlistRepository.save(entity)
    return entity
  }

  async deletePlaylist(PlaylistId: number): Promise<Playlist> {
    const entity = await this.playlistRepository.findOne
      ({
        where: { id: PlaylistId }
      })
    if (entity) {
      entity.playlist_status = PlaylistStatus.INACTIVE;
      await this.playlistRepository.save(entity)
    }
    return entity;
  }
}
