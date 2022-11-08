import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { Audio } from "./entities/audio.entity";
import AudioService from "./audio.services";
import { AudioStatus } from "./enum/audioStatus.enum";
import AudioDto from "./dto/audio.dto";

import { CreateAudioDTO } from "./dto/createAudio.dto";
import SearchAudioDto from "./dto/searchAudio.dto";
import UpdateAudioDto from "./dto/updateAudio.dto";

@ApiTags('audio')
@Controller('audio')

export default class AudioController {
  constructor(private readonly audioService: AudioService) { }
  @Get(':id')
  async getAudioById(@Param('id') id: number): Promise<AudioDto> {
    return this.audioService.findAudioById(id);
  }
  @Get()
  async getAudios(
    @Query() audio: SearchAudioDto,
  ): Promise<AudioDto[]> {
    return this.audioService.findAudios(audio);
     
  }

  @Post()
  async createAudio(@Body() createAudioDto: CreateAudioDTO): Promise<AudioDto> {
    return this.audioService.createAudio(createAudioDto);
    
  }

  @Put(':id')
  async updateAudio(@Param('id') id: number, @Body() updateAudioDto: UpdateAudioDto): Promise<Audio> {
    return await this.audioService.updateAudio(id, updateAudioDto);
  }

  @Delete(':id')
  async deleteAudio(@Param('id') id: number) {
    return await this.audioService.deleteAudio(id)
  }

}