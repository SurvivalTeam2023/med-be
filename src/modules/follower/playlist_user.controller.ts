import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles, Unprotected } from "nest-keycloak-connect";
import { RequestPayload } from "src/decorator/requestPayload.decorator";
import { PlaylistUserEntity } from "./entities/playlist_user.entity";
import PlaylistUserService from "./playlist_user.service";
import { USER_CLIENT_ROLE } from "src/common/enums/userClientRole.enum";
import CreateFollowerDTO from "./dto/createPlaylistUser.dto";

@ApiTags('playlist_user')
@Controller('playlist_user')
@ApiBearerAuth()
export default class PlaylistUserController {
    constructor(private readonly PlaylistUserService: PlaylistUserService) { }

    @Post()
    @Unprotected()
    @ApiOperation({ summary: 'like playlist' })
    async followPlaylist(@RequestPayload() token: string, @Body() dto: CreateFollowerDTO): Promise<PlaylistUserEntity> {
        return await this.PlaylistUserService.followPlaylist(dto, token);
    }


    @Get()
    @Unprotected()
    @ApiOperation({ summary: 'get favorite playlist' })
    async getfollowPlaylist(@RequestPayload() token: string): Promise<PlaylistUserEntity> {
        return await this.PlaylistUserService.getFollowPlaylist(token);
    }
}