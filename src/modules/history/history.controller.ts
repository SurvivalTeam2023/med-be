import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { RequestPayload } from 'src/decorator/requestPayload.decorator';
import CreateHistoryDTO from './dto/createHistory.dto';
import { HistoryEntity } from './entities/history.entity';
import HistoryService from './history.service';
import { AudioEntity } from '../audio/entities/audio.entity';
import { USER_CLIENT_ROLE } from 'src/common/enums/userClientRole.enum';

@ApiTags('History')
@Controller('history')
@ApiBearerAuth()
@Controller('rest/history')
export default class HistoryController {
  constructor(private readonly historyService: HistoryService) { }
  @ApiOperation({ summary: 'create History' })
  @Unprotected()
  @Post('create')
  async createHistory(
    @Body() dto: CreateHistoryDTO,
    @RequestPayload() token: string,
  ): Promise<HistoryEntity> {
    return this.historyService.createHistory(dto, token);
  }

  @ApiOperation({ summary: 'get recent listened by userId' })
  @Get()
  @Unprotected()
  async getAllHistory(
    @RequestPayload() token: string,
  ): Promise<{ audio: AudioEntity, isLiked: boolean }[]> {
    return this.historyService.findHistory(token);
  }

  @ApiOperation({ summary: 'total listener of an artist' })
  @Get('count/:artistId')
  @Unprotected()
  async getListener(
    @Param('artistId') artistId: string,
  ): Promise<HistoryEntity[]> {
    return this.historyService.countArtistListened(artistId);
  }

  @ApiOperation({ summary: 'get top 10 listened' })
  @Get('/top10')
  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  async getTop10(
  ): Promise<any> {
    return this.historyService.getTop10Listened();
  }
}
