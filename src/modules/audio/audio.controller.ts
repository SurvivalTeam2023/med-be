import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Audio } from './entities/audio.entity';
import AudioService from './audio.services';
import { CreateAudioDTO } from './dto/createAudio.dto';
import SearchAudioDto from './dto/searchAudio.dto';
import UpdateAudioDto from './dto/updateAudio.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'nest-keycloak-connect';
import { USER_ROLE } from 'src/common/enums/user-role.enum';

@ApiTags('audio')
@Controller('audio')
@ApiBearerAuth()
export default class AudioController {
  constructor(private readonly audioService: AudioService) { }

  @Get(':id')
  async getAudioById(@Param('id') id: number): Promise<Audio> {
    return this.audioService.findAudioById(id);
  }

  @Get()
  async getAudios(
    @Query() audio: SearchAudioDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Audio>> {
    limit = limit > 100 ? 100 : limit;
    return this.audioService.findAudios(
      {
        page,
        limit,
      },
      audio,
    );
  }

  @Roles({ roles: [USER_ROLE.ARTIST, USER_ROLE.SUBSCRIBER] })
  @Post()
  async createAudio(@Body() createAudioDto: CreateAudioDTO): Promise<Audio> {
    return this.audioService.createAudio(createAudioDto);
  }

  @Put(':id')
  @Roles({ roles: [USER_ROLE.ARTIST] })
  async updateAudio(
    @Param('id') id: number,
    @Body() updateAudioDto: UpdateAudioDto,
  ): Promise<Audio> {
    return await this.audioService.updateAudio(id, updateAudioDto);
  }

  @Delete(':id')
  @Roles({ roles: [USER_ROLE.ARTIST] })
  async deleteAudio(@Param('id') id: number) {
    return await this.audioService.deleteAudio(id);
  }
}
