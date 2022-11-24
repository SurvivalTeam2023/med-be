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
import { ApiTags } from '@nestjs/swagger';
import CreatePlaylistDto from './dto/createPlaylist.dto';
import SearchPlaylistDto from './dto/searchPlaylistDto';
import UpdatePlaylistDto from './dto/updatePlaylist.dto';
import { Playlist } from './entities/playlist.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import PlaylistService from './playlist.service';

@ApiTags('playlist')
@Controller('playlist')
export default class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get(':id')
  async getPlaylistById(@Param('id') id: number): Promise<Playlist> {
    return await this.playlistService.findPlaylistById(id);
  }

  @Get()
  async getPlaylists(
    @Query() playlist: SearchPlaylistDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Playlist>> {
    limit = limit > 100 ? 100 : limit;
    return this.playlistService.findPlaylist(
      {
        page,
        limit,
      },
      playlist,
    );
  }

  @Post()
  async createPlaylist(
    @Body() createPlaylistDto: CreatePlaylistDto,
  ): Promise<Playlist> {
    return await this.playlistService.createPlaylist(createPlaylistDto);
  }

  @Put(':id')
  async updatePlaylist(
    @Param('id') id: number,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<Playlist> {
    return await this.playlistService.updatePlaylist(id, updatePlaylistDto);
  }

  @Delete(':id')
  async deletePlaylist(@Param('id') id: number) {
    return await this.playlistService.deletePlaylist(id);
  }
}
