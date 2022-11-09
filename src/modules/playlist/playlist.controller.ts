import { Body, Controller, Delete, ForbiddenException, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseFilters } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/common/filters/http-exception.filter";
import CreatePlaylistDto from "./dto/createPlaylist.dto";
import PlaylistDto from "./dto/playlist.dto";
import SearchPlaylistDto from "./dto/searchPlaylistDto";
import UpdatePlaylistDto from "./dto/updatePlaylist.dto";
import { Playlist } from "./entities/playlist.entity";
import PlaylistService from "./playlist.service";


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
    @Query() Playlist: SearchPlaylistDto,
  ): Promise<Playlist[]> {
    const Playlists = await this.PlaylistService.findPlaylist(Playlist);
    return Playlists;
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