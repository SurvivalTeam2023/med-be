import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { Audio } from "./audio.entity";
import AudioService from "./audio.services";
import { AudioStatus } from "./audioStatus.enum";
import AudioDto from "./dto/audio.dto";

import { CreateAudioDto } from "./dto/createAudio.dto";
import SearchAudioDto from "./dto/searchAudio.dto";
import UpdateAudioDto from "./dto/updateAudio.dto";

@ApiTags('audio')
@Controller('audio')

export default class AudioController {
  constructor(private readonly audioService: AudioService) { }
  @Get(':id')
  async getAudioById(@Param('id') id: number): Promise<AudioDto> {
    const audios = await this.audioService.findAudioById(id);

    return audios;
  }
  @Get()
  async getAudios(
    @Query() audio: SearchAudioDto,
  ): Promise<AudioDto[]> {
    const audios = await this.audioService.findAudios(audio);
    // console.log(audio.name,audio.audio_status,audio.playlist_id)
    return audios;
  }

  @Post()
  async createAudio(@Body() createAudioDto: CreateAudioDto): Promise<AudioDto> {
    const audio = await this.audioService.createAudio(createAudioDto);
    console.log(audio, "controller")
    return audio
  }

  @Put(':id/audio_playlist')
  async updateAudio(@Param('id') id: number,  @Body() updateAudioDto: UpdateAudioDto): Promise<Audio> {
    return await this.audioService.updateAudio(id, updateAudioDto);
  }

  @Delete(':id')
  async deleteAudio(@Param('id') id: number) {
    return await this.audioService.deleteAudio(id)
  }

}