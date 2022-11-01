import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Audio } from "./audio.entity";
import { AudioStatus } from "./audioStatus.enum";
import { CreateAudioDto } from "./dto/createAudio.dto";

@Injectable()
export default class AudioService {
    constructor(
        @InjectRepository(Audio)
        private audioRepository: Repository<Audio>
      ) {}

      async findAudioById(id:number) : Promise<Audio> 
      {
        return await this.audioRepository.findOne({
        where:{id}
        })
    }
      async findAudioByName(name:string) : Promise<Audio[]> 
      {
        return await this.audioRepository.find({
        where:{name},
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
  async findAudioByPlaylistId(playlist_id:string) : Promise<Audio[]> 
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
    const entity= await this.audioRepository.create({
        ...dto
    });
    await this.audioRepository.save(entity);
    return entity;
  }
}
      

