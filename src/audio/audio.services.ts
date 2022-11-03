import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Audio } from "./audio.entity"
import { AudioStatus } from "./audioStatus.enum";
import { CreateAudioDto } from "./dto/createAudio.dto";
import UpdateAudioDto from "./dto/updateAudio.dto";

@Injectable()
export default class AudioService {
    constructor(
        @InjectRepository(Audio)
        private audioRepository: Repository<Audio>
      ) {}

      async findAudioById(id:number) : Promise<Audio> 
      { 

        return await this.audioRepository.findOne({
        where:{id:id}
        })
    }
      async findAudioByName(name:string) : Promise<Audio[]> 
      {
        return await this.audioRepository.find({
        where:{name:name},
        order: {
                created_at: "DESC",
            }
        })
    }
    async findAudioByStatus(audio_status:AudioStatus) : Promise<Audio[]> 
    {
      return await this.audioRepository.find({
      where:{audio_status},
      order: {
              created_at: "DESC",
          }
      })
  }
  async findAudioByPlaylistId(playlist_id:number) : Promise<Audio[]> 
  {
    return await this.audioRepository.find({
    where:{playlist_id},
    order: {
            created_at: "DESC",
        }
    })
}
async createAudio(dto:CreateAudioDto): Promise<Audio>
{
const entity= new Audio()
entity.name=dto.name;
entity.image_url=dto.image_url;
entity.length=dto.length;
entity.audio_status=dto.audio_status;
entity.playlist_id=dto.playlist_id;
await this.audioRepository.save(entity);
    return entity;
  }
  async updateAudio(id:number,dto:UpdateAudioDto): Promise<Audio>
  {
    const entity= await this.audioRepository.findOne({
      where:{id:id}
    })
    if(entity)
    {
      entity.name=dto.name;
      entity.image_url=dto.image_url;
      entity.length=dto.length;
      entity.audio_status=dto.audio_status;
      entity.playlist_id=dto.playlist_id;
      await this.audioRepository.save(entity)
    }
    
    return entity;
  }

  async deleteAudio(id:number)
  {
      const entity = await this.audioRepository.findOne
      ({
        where:{id:id}
      })
      if(entity)
      {
        entity.audio_status=AudioStatus.INACTIVE;
        await this.audioRepository.save(entity)
      }
  }
}
      

