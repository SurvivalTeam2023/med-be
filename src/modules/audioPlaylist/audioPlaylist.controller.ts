import { Body, Controller, Param, Post, Delete, Query } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import AudioPlaylistService from "./audioPlaylist.services";
import { AudioPlaylistEntity } from "./entities/audioPlaylist.entity";
import { createAudioPlaylistDTO } from "./dto/createAudioPlaylist.dto";
import { RequestPayload } from "src/decorator/requestPayload.decorator";
import { Roles } from "nest-keycloak-connect";
import { USER_CLIENT_ROLE } from "src/common/enums/userClientRole.enum";

@ApiTags('AudioPlaylists')
@Controller('audioPlaylist')
@ApiBearerAuth()
export default class AudioPlaylistController {
    constructor(private readonly audioPlaylistService: AudioPlaylistService) { }
    @Roles({ roles: [USER_CLIENT_ROLE.ARTIST, USER_CLIENT_ROLE.USER, USER_CLIENT_ROLE.SUBSCRIBER] })
    @ApiOperation({ summary: 'add audio to playlist' })
    @Post()
    async addAudioToPlaylist(@Body() dto: createAudioPlaylistDTO, @RequestPayload() token: string): Promise<AudioPlaylistEntity> {
        return await this.audioPlaylistService.addAudioToPlaylist(dto, token)
    }
    @Roles({ roles: [USER_CLIENT_ROLE.ARTIST, USER_CLIENT_ROLE.USER, USER_CLIENT_ROLE.SUBSCRIBER] })
    @ApiOperation({ summary: 'remove audio from playlist' })
    @Delete()
    async removeAudioFromPlaylist(@Query('audioId') audioId: number, @Query('playlistId') playlistId: number, @RequestPayload() token: string) {
        return await this.audioPlaylistService.removeAudioFromPlaylist(playlistId, audioId, token)
    }
}