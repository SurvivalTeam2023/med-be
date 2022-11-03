import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Audio } from "./audio.entity";
import AudioService from "./audio.services";
import { AudioStatus } from "./audioStatus.enum";
import { CreateAudioDto } from "./dto/createAudio.dto";
import UpdateAudioDto from "./dto/updateAudio.dto";

@Controller('audio')
@ApiTags('audio')
export default class AudioController {
    constructor(private readonly audioService: AudioService) {}
    @Get(':id')
    async  getAudioById(@Param('id') id : number) {
        return await this.audioService.findAudioById(id);
      }
      @Get(':name')
      async  getAudioByName(@Param('name') name : string) {
        return await this.audioService.findAudioByName(name);
      }
      @Get(':status')
      async  getAudioByStatus(@Param('status') audioStatus : AudioStatus) {
        return await this.audioService.findAudioByStatus(audioStatus);
      }

      
    @Post()
    async  createAudio(@Body() createAudioDto: CreateAudioDto): Promise<Audio> {
    return  await this.audioService.createAudio(createAudioDto);
      }
      
    @Put(':id')
    async updateAudio(@Param('id') id:number,@Body() updateAudioDto:UpdateAudioDto,): Promise<Audio>
    {
      return await this.audioService.updateAudio(id,updateAudioDto);
    }
      
    @Delete(':id')
      async deleteAudio(@Param('id') id:number)
      {
        return await this.audioService.deleteAudio(id)
      }

    }