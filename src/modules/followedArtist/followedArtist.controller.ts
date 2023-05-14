import { Controller, Post, Body, Delete, Query, Get, Param } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiBody, ApiProperty, ApiOperation } from "@nestjs/swagger"
import { Roles, Unprotected } from "nest-keycloak-connect"
import { USER_CLIENT_ROLE } from "src/common/enums/userClientRole.enum"
import { RequestPayload } from "src/decorator/requestPayload.decorator"
import FollowedArtistService from "./followedArtist.service"
import { FollowedArtistEntity } from "./entities/followedArtist.entity"
import { followArtistDTO } from "./dto/followArtist.dto"

@ApiTags('FollowedArtist')
@Controller('followedArtist')
@ApiBearerAuth()
export default class FollowedArtistController {
    constructor(private readonly followedArtistService: FollowedArtistService) { }
    @Roles({ roles: [USER_CLIENT_ROLE.SUBSCRIBER] })
    @Post()
    async addAudioToPlaylist(@Body() dto: followArtistDTO, @RequestPayload() token: string): Promise<FollowedArtistEntity> {
        return await this.followedArtistService.followArtist(dto, token)
    }

    @Unprotected()
    @ApiOperation({ summary: 'Get total follower' })
    @Get(':artistId')
    async getTotalFollower(@Param('artistId') artistId: string): Promise<number> {
        return await this.followedArtistService.showTotalFollower(artistId)
    }

    @Roles({ roles: [USER_CLIENT_ROLE.SUBSCRIBER] })
    @Delete('artistId')
    async removeAudioFromPlaylist(@Param('artistId') artistId: string, @RequestPayload() token: string) {
        return await this.followedArtistService.unfollowArtist(artistId, token)
    }
}