import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import PlaylistService from "src/playlist/playlist.service";
import { Repository } from "typeorm";
import AudioPlaylist from "./audioPlaylist.entity";
import AudioPlaylistDto from "./dto/audioPlaylist.dto";

@Injectable()
export default class AudioPlaylistService {
    constructor(
        @InjectRepository(AudioPlaylist)
        private audioPlaylistRepository: Repository<AudioPlaylist>,

      ) {}

      async createAudioPlaylist(playlistId:number):Promise<AudioPlaylist>
      {
        let playlistService: PlaylistService
        const playlist= await playlistService.findPlaylistById(playlistId)
        if(playlist){
        const entity= new AudioPlaylist()
        entity.playlist.id=playlist.id;
        await this.audioPlaylistRepository.save(entity)
        
        return entity
      }
    }
  }
