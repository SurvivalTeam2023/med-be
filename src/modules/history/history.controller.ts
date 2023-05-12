/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Unprotected } from 'nest-keycloak-connect';
import { RequestPayload } from 'src/decorator/requestPayload.decorator';
import CreateHistoryDTO from './dto/createHistory.dto';
import { HistoryEntity } from './entities/history.entity';
import HistoryService from './history.service';

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

  @ApiOperation({ summary: 'find Favorite by userId' })
  @Get(':userId')
  @Unprotected()
  async getAllFavorite(
    @Param('userId') userId: string,
  ): Promise<HistoryEntity[]> {
    return this.historyService.findHistory(userId);
  }

  @ApiOperation({ summary: 'total listener of an artist' })
  @Get('count/:artistId')
  @Unprotected()
  async getListener(
    @Param('artistId') artistId: string,
  ): Promise<HistoryEntity[]> {
    return this.historyService.countArtistListened(artistId);
  }
}
