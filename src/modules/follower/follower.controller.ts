import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Unprotected } from "nest-keycloak-connect";
import { RequestPayload } from "src/decorator/requestPayload.decorator";
import { FollowerEntity } from "./entities/follower.entity";
import FollowerService from "./follower.service";

@ApiTags('Follower')
@Controller('followers')
@ApiBearerAuth()
export default class FollowerController {
    constructor(private readonly followerService: FollowerService) { }

    @Get()
    @Unprotected()
    async getPlaylistById(@RequestPayload() token: string): Promise<FollowerEntity[]> {
        return await this.followerService.findPlaylistByAuthorId(token);
    }
}