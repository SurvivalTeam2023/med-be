import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles, Unprotected } from "nest-keycloak-connect";
import { RequestPayload } from "src/decorator/requestPayload.decorator";
import { FollowerEntity } from "./entities/follower.entity";
import FollowerService from "./follower.service";
import { USER_CLIENT_ROLE } from "src/common/enums/userClientRole.enum";
import CreateFollowerDTO from "./dto/createFollower.dto";

@ApiTags('Follower')
@Controller('followers')
@ApiBearerAuth()
export default class FollowerController {
    constructor(private readonly followerService: FollowerService) { }

    @Post()
    @Unprotected()
    @ApiOperation({ summary: 'like playlist' })
    async followPlaylist(@RequestPayload() token: string, @Body() dto: CreateFollowerDTO): Promise<FollowerEntity> {
        return await this.followerService.followPlaylist(dto, token);
    }


    @Get()
    @Unprotected()
    @ApiOperation({ summary: 'get favorite playlist' })
    async getfollowPlaylist(@RequestPayload() token: string): Promise<FollowerEntity> {
        return await this.followerService.getFollowPlaylist(token);
    }
}