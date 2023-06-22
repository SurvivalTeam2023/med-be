/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
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
import { AudioEntity } from './entities/audio.entity';
import AudioService from './audio.services';
import { CreateAudioDTO } from './dto/createAudio.dto';
import SearchAudioDto from './dto/searchAudio.dto';
import UpdateAudioDto from './dto/updateAudio.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { USER_CLIENT_ROLE } from 'src/common/enums/userClientRole.enum';
import { RequestPayload } from 'src/decorator/requestPayload.decorator';

@ApiTags('Audios')
@Controller('audio')
@ApiBearerAuth()
export default class AudioController {
  constructor(private readonly audioService: AudioService) { }

  @Get(':id')
  @Unprotected()
  @ApiOperation({ summary: 'get audio by audio id' })
  async getAudioById(@Param('id') id: number): Promise<AudioEntity> {
    return this.audioService.findAudioById(id);
  }

  @Get()
  @Unprotected()
  @ApiOperation({ summary: 'get audio list' })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  async getAudios(
    @Query() audio: SearchAudioDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<AudioEntity>> {
    limit = limit > 100 ? 100 : limit;
    return this.audioService.findAudios(audio, {
      page,
      limit,
    });
  }

  @Roles({ roles: [USER_CLIENT_ROLE.ARTIST] })
  @Post()
  @ApiOperation({ summary: 'create audio' })
  async createAudio(
    @Body() createAudioDto: CreateAudioDTO, @RequestPayload() token: string
  ): Promise<AudioEntity> {
    return this.audioService.createAudio(createAudioDto, token);
  }

  @Put(':id')
  @Roles({ roles: [USER_CLIENT_ROLE.ARTIST] })
  @ApiOperation({ summary: 'update audio field' })
  async updateAudio(
    @Param('id') id: number,
    @Body() updateAudioDto: UpdateAudioDto,
  ): Promise<AudioEntity> {
    return await this.audioService.updateAudio(id, updateAudioDto);
  }

  @Delete(':id')
  @Roles({ roles: [USER_CLIENT_ROLE.ARTIST] })
  @ApiOperation({ summary: 'delete audio' })
  async deleteAudio(@Param('id') id: number) {
    return await this.audioService.deleteAudio(id);
  }

  @Get('countAudios')
  @Roles({ roles: [USER_CLIENT_ROLE.ARTIST] })
  @ApiOperation({ summary: 'get total audio' })
  async getCountAudio(): Promise<number> {
    return await this.audioService.countAudio();
  }

}
