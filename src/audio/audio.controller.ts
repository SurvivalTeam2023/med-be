import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import AudioService from "./audio.services";
import { CreateAudioDto } from "./dto/createAudio.dto";

@Controller('audio')
@ApiTags('audio')
export default class AudioController {
    constructor(private readonly audioService: AudioService) {}
    @Get(':id')
    getAudioById(@Param('id') id : number) {
        return this.audioService.findAudioById(id)
      }
      @Post()
      create(@Body() createAudioDto: CreateAudioDto) {
        return this.audioService.createAudio(createAudioDto);
      }

    }