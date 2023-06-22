import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles, Unprotected } from "nest-keycloak-connect";
import { USER_CLIENT_ROLE } from "src/common/enums/userClientRole.enum";
import ArtistService from "./artist.service";

@ApiTags('Artist')
@Controller('artist')
@ApiBearerAuth()
export default class ArtistController {
    constructor(private readonly artistService: ArtistService) { }

    @Get()
    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    @ApiOperation({ summary: 'get total artist' })
    async getCountArtist(): Promise<number> {
        return this.artistService.countArtist();
    }
}