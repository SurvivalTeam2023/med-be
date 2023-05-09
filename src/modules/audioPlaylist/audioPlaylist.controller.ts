import { Body, Controller, Param, Post, Delete, Query } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import AudioPlaylistService from "./audioPlaylist.services";
import { AudioPlaylistEntity } from "./entities/audioPlaylist.entity";
import { createAudioPlaylistDTO } from "./dto/createAudioPlaylist.dto";
import { RequestPayload } from "src/decorator/requestPayload.decorator";
import { Unprotected } from "nest-keycloak-connect";

@ApiTags('AudioPlaylists')
@Controller('audioPlaylist')
@ApiBearerAuth()
export default class AudioPlaylistController {
    constructor(private readonly audioPlaylistService: AudioPlaylistService) { }
    @Unprotected()
    @Post()
    async addAudioToPlaylist(@Body() dto: createAudioPlaylistDTO, @RequestPayload() token: string): Promise<AudioPlaylistEntity> {
        return await this.audioPlaylistService.addAudioToPlaylist(dto, token)
    }
    @Unprotected()
    @Delete()
    async removeAudioFromPlaylist(@Query('audioId') audioId: number, @Query('playlistId') playlistId: number, @RequestPayload() token: string) {
        return await this.audioPlaylistService.removeAudioFromPlaylist(playlistId, audioId, token)
    }
}