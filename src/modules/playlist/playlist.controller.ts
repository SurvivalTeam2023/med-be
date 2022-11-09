import { Body, Controller, DefaultValuePipe, Delete, ForbiddenException, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseFilters } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import CreatePlaylistDto from "./dto/createPlaylist.dto";
import PlaylistDto from "./dto/playlist.dto";
import SearchPlaylistDto from "./dto/searchPlaylistDto";
import UpdatePlaylistDto from "./dto/updatePlaylist.dto";
import { Playlist } from "./entities/playlist.entity";
import PlaylistService from "./playlist.service";
import { Pagination } from "nestjs-typeorm-paginate";

@ApiTags('playlist')
@Controller('playlist')

export default class PlaylistController {
  constructor(private readonly PlaylistService: PlaylistService) { }

  @Get(':id')
  async getPlaylistById(@Param('id') id: number): Promise<Playlist> {
    return await this.PlaylistService.findPlaylistById(id);
  }

  @Get()
  async getPlaylists(
    @Query() playlist: SearchPlaylistDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Playlist>> {
    limit = limit > 100 ? 100 : limit
    return this.PlaylistService.findPlaylist({
      page,
      limit
    },playlist)
  }

  @Post()
  async createPlaylist(@Body() createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    return await this.PlaylistService.createPlaylist(createPlaylistDto);
  }

  @Put(':id')
  async updatePlaylist(@Param('id') id: number, @Body() updatePlaylistDto: UpdatePlaylistDto,): Promise<Playlist> {
    return await this.PlaylistService.updatePlaylist(id, updatePlaylistDto);
  }

  @Delete(':id')
  async deletePlaylist(@Param('id') id: number) {
    return await this.PlaylistService.deletePlaylist(id)
  }

}