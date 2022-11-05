import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import AudioPlaylistDto from "src/audioPlaylist/dto/audioPlaylist.dto";
import AudioPlaylist from "src/audioPlaylist/audioPlaylist.entity";
import { Playlist } from "src/playlist/playlist.entity";
import PlaylistService from "src/playlist/playlist.service";
import { Repository } from 'typeorm';
import { Audio } from "./audio.entity"
import { AudioStatus } from "./audioStatus.enum";
import AudioDto from "./dto/audio.dto";
import { CreateAudioDto } from "./dto/createAudio.dto";
import SearchAudioDto from "./dto/searchAudio.dto";
import UpdateAudioDto from "./dto/updateAudio.dto";
import AudioPlaylistService from "src/audioPlaylist/audioPlaylist.service";

@Injectable()
export default class AudioService {
    constructor(
        @InjectRepository(Audio)
        private audioRepository: Repository<AudioDto>,

      ) {}

      async findAudioById(audioId:number) : Promise<AudioDto> 
      { 
          const entity= await this
          .audioRepository
          .createQueryBuilder('audio')
          .leftJoin("audio_playlist","audio_playlist","audio_playlist.audio_id=audio.id")
          .select(['audio','audio_playlist'])
          .where('audio.id = :audioId',{audioId})
          .printSql()
          .getOne()

          return entity;

    }
      async findAudios(dto:SearchAudioDto) : Promise<AudioDto[]> 
      { 
        let audioPlaylistDto: AudioPlaylistDto[];

        const entity= await this
        .audioRepository
        .createQueryBuilder("audio")
        .leftJoin("audio_playlist","audio_playlist","audio_playlist.audio_id=audio.id")
        .select(['audio','audio_playlist'])
        .where("audio.name like :name", { name :`%${dto.name}%` })
        .orWhere("audio.audio_status = :audioStatus",{ audioStatus:dto.audio_status })
        .orWhere("audio_playlist.playlist_id = :playlistId",{ playlistId : dto.playlist_id })
        .orderBy("audio.created_at","DESC")
        .getMany()
        // console.log(name,audioStatus,playlistId)
        return entity;
    }

async createAudio(dto:CreateAudioDto): Promise<AudioDto>
{
let audioPlaylistService: AudioPlaylistService
const p:AudioPlaylist[]=[]
 dto.playlist_id=[]
dto.playlist_id.forEach(async element => {
  const audioPlaylist=await audioPlaylistService.createAudioPlaylist(element)
  p.push(audioPlaylist)
});
const entity= new Audio()
entity.name=dto.name;
entity.image_url=dto.image_url;
entity.length=dto.length;
entity.audio_status=dto.audio_status; 
entity.audio_playlist=p;
await this.audioRepository.save(entity);
console.log("service", p)
    return entity;
  }
  // async updateAudio(audioId:number,dto:UpdateAudioDto): Promise<Audio>
  // {
  //   const entity= await this.audioRepository.findOne({
  //     where:{id:audioId}
  //   })
  //   if(entity)
  //   {
  //     entity.name=dto.name;
  //     entity.image_url=dto.image_url;
  //     entity.length=dto.length;
  //     entity.audio_status=dto.audio_status;
  //     entity.playlist_id=dto.playlist_id;
  //     await this.audioRepository.save(entity)
  //   }
    
  //   return entity;
  // }

  async deleteAudio(audioId:number):Promise<AudioDto>
  {
      const entity = await this.audioRepository.findOne
      ({
        where:{id:audioId}
      })
      if(entity)
      {
        entity.audio_status=AudioStatus.INACTIVE;
        await this.audioRepository.save(entity)
      }
      return entity;
  }
  
}
      

