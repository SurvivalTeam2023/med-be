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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import CreatePlaylistDto from './dto/createPlaylist.dto';
import SearchPlaylistDto from './dto/searchPlaylistDto';
import UpdatePlaylistDto from './dto/updatePlaylist.dto';
import { Playlist } from './entities/playlist.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import PlaylistService from './playlist.service';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { USER_ROLE } from 'src/common/enums/user-role.enum';

@ApiTags('playlist')
@Controller('playlist')
@ApiBearerAuth()
export default class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) { }

  @Get(':id')
  @Unprotected()
  async getPlaylistById(@Param('id') id: number): Promise<Playlist> {
    return await this.playlistService.findPlaylistById(id);
  }

  @Get()
  @Unprotected()
  async getPlaylists(
    @Query() playlist: SearchPlaylistDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page:number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit:number = 10,
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
  @Roles({ roles: [USER_ROLE.ARTIST] })
  async createPlaylist(
    @Body() createPlaylistDto: CreatePlaylistDto,
  ): Promise<Playlist> {
    return await this.playlistService.createPlaylist(createPlaylistDto);
  }

  @Put(':id')
  @Roles({ roles: [USER_ROLE.ARTIST] }) 
  async updatePlaylist(
    @Param('id') id: number,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<Playlist> {
    return await this.playlistService.updatePlaylist(id, updatePlaylistDto);
  }

  @Delete(':id')
  @Roles({ roles: [USER_ROLE.ARTIST] })
  async deletePlaylist(@Param('id') id: number) {
    return await this.playlistService.deletePlaylist(id);
  }
}
