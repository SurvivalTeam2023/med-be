import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger"
import AudioUserService from "./audioUser.services"
import { Body, Controller, DefaultValuePipe, Get, ParseIntPipe, Post, Query } from "@nestjs/common"
import { Roles, Unprotected } from "nest-keycloak-connect";
import { Pagination } from "nestjs-typeorm-paginate";
import { RequestPayload } from "src/decorator/requestPayload.decorator";
import AudioDTO from "../audio/dto/audio.dto";
import SearchLikedAudioDTO from "./dto/searchLikedAudio.dto";
import { AudioUserEntity } from "./entities/audioUser.entity";
import { USER_CLIENT_ROLE } from "src/common/enums/userClientRole.enum";
import LikedAudioDTO from "./dto/likeAudio.dto";
import { AudioEntity } from "../audio/entities/audio.entity";


@ApiTags('AudioUser')
@Controller('audioUser')
@ApiBearerAuth()
export default class AudioUserController {
    constructor(private readonly audioUserService: AudioUserService) { }


    @Get()
    @Unprotected()
    @ApiOperation({ summary: 'get liked audio list' })
    async getAudios(
        @RequestPayload() token: string,
        @Query() dto: SearchLikedAudioDTO,
    ): Promise<{ audio: AudioEntity, isLiked: boolean }[]> {
        return this.audioUserService.getLikedAudio(dto, token);
    }

    // @Roles({ roles: [USER_CLIENT_ROLE.USER, USER_CLIENT_ROLE.SUBSCRIBER] })
    @Unprotected()
    @ApiOperation({ summary: 'like audio' })
    @Post()
    async addAudioToPlaylist(@Body() dto: LikedAudioDTO, @RequestPayload() token: string): Promise<{ audio: AudioEntity, isLiked: boolean }> {
        return await this.audioUserService.updateIsLiked(dto.audioId, dto.isLiked, token)
    }
}