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



@Injectable()
export default class AudioService {
  constructor(
    @InjectRepository(Audio)
    private audioRepository: Repository<Audio>,
    @InjectRepository(AudioPlaylist)
    private audioPlaylistRepository: Repository<AudioPlaylist>,


  ) { }

  async findAudioById(audioId: number): Promise<AudioDto> {
    const entity = await this
      .audioRepository
      .createQueryBuilder('audio')
      .select(['audio', 'audio_playlist.playlist_id'])
      .leftJoin("audio.audio_playlist", "audio_playlist")
      .where('audio.id = :audioId', { audioId })
      .printSql()
      .getOne()

    return entity;

  }
  async findAudios(dto: SearchAudioDto): Promise<AudioDto[]> {
    let audioPlaylistDto: AudioPlaylistDto[];

    const entity = await this
      .audioRepository
      .createQueryBuilder("audio")
      .leftJoin("audio.audio_playlist", "audio_playlist")
      .select(['audio.name', 'audio_playlist'])
      .where("audio.name like :name", { name: `%${dto.name}%` })
      .orWhere("audio.audio_status = :audioStatus", { audioStatus: dto.audio_status })
      .orWhere("audio_playlist.playlist_id = :playlistId", { playlistId: dto.playlist_id })
      .orderBy("audio.created_at", "DESC")
      .getMany()
    // console.log(name,audioStatus,playlistId)
    return entity;
  }
  async createAudio(dto: CreateAudioDto): Promise<AudioDto> {
    const p: AudioPlaylist[] = []
    if (dto.playlist_id) {
      for (let playlistId of dto.playlist_id) {
        const audioPlaylist = new AudioPlaylist()
        audioPlaylist.playlist_id = playlistId
        p.push(audioPlaylist)
      };
    }
    const entity = new Audio()
    entity.name = dto.name;
    entity.image_url = dto.image_url;
    entity.length = dto.length;
    entity.audio_status = dto.audio_status;
    entity.audio_playlist=p
    await this.audioRepository.save(entity);


    return entity;
  }
  async updateAudio(audioId: number,  dto: UpdateAudioDto): Promise<Audio> {
    const entity = await this.audioRepository.findOne({
      relations: { audio_playlist: true },
      where: { id: audioId }
    })
    if (entity) {
      entity.name = dto.name;
      entity.image_url = dto.image_url;
      entity.length = dto.length;
      entity.audio_status = dto.audio_status;
      await this.audioRepository.save(entity)


      return entity;
    }
  }

  async deleteAudio(audioId: number): Promise<AudioDto> {
    const entity = await this.audioRepository.findOne
      ({
        where: { id: audioId }
      })
    if (entity) {
      entity.audio_status = AudioStatus.INACTIVE;
      await this.audioRepository.save(entity)
    }
    return entity;
  }

}


