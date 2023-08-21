/* eslint-disable @typescript-eslint/no-inferrable-types */
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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import CreatePlaylistDto from './dto/createPlaylist.dto';
import SearchPlaylistDto from './dto/searchPlaylistDto';
import UpdatePlaylistDto from './dto/updatePlaylist.dto';
import { PlaylistEntity } from './entities/playlist.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import PlaylistService from './playlist.service';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { USER_CLIENT_ROLE } from 'src/common/enums/userClientRole.enum';
import { RequestPayload } from 'src/decorator/requestPayload.decorator';
import PlaylistDTO from './dto/playlist.dto';

@ApiTags('Playlists')
@Controller('playlist')
@ApiBearerAuth()
export default class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) { }

  @Get(':id')
  @Unprotected()
  @ApiOperation({ summary: 'get playlist by id' })
  async getPlaylistById(@Param('id') id: number): Promise<PlaylistEntity> {
    return await this.playlistService.findPlaylistById(id);
  }

  @Get()
  @Unprotected()
  @ApiOperation({ summary: 'get playlist list' })
  async getPlaylists(
    @Query() playlist: SearchPlaylistDto,
  ): Promise<Pagination<PlaylistDTO>> {
    return this.playlistService.findPlaylist(
      playlist,
    );
  }

  @Post()
  @ApiOperation({ summary: 'create playlist' })
  @Roles({ roles: [USER_CLIENT_ROLE.ARTIST, USER_CLIENT_ROLE.USER] })
  async createPlaylist(
    @Body() createPlaylistDto: CreatePlaylistDto,
    @RequestPayload() token: string,
  ): Promise<PlaylistEntity> {
    return await this.playlistService.createPlaylist(createPlaylistDto, token);
  }

  @Put(':id')
  @Roles({ roles: [USER_CLIENT_ROLE.ARTIST] })
  @ApiOperation({ summary: 'update playlist' })
  async updatePlaylist(
    @Param('id') id: number,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<PlaylistEntity> {
    return await this.playlistService.updatePlaylist(id, updatePlaylistDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete playlist' })
  @Roles({ roles: [USER_CLIENT_ROLE.ARTIST, USER_CLIENT_ROLE.USER] })
  async deletePlaylist(@Param('id') id: number) {
    return await this.playlistService.deletePlaylist(id);
  }
}
