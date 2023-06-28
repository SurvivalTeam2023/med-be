import { Controller, Get, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles, Unprotected } from "nest-keycloak-connect";
import { USER_CLIENT_ROLE } from "src/common/enums/userClientRole.enum";
import ArtistService from "./artist.service";
import ArtistEntity from "./entities/artist.entity";

@ApiTags('Artist')
@Controller('artist')
@ApiBearerAuth()
export default class ArtistController {
    constructor(private readonly artistService: ArtistService) { }

    @Get(':id')
    @Unprotected()
    @ApiOperation({ summary: 'get artist by id' })
    async getArtistById(@Param('id') id: string): Promise<ArtistEntity> {
        return this.artistService.getArtistByID(id);
    }
    @Get()
    @Unprotected()
    @ApiOperation({ summary: 'get artist list' })
    async getArtist(): Promise<number> {
        return this.artistService.countArtist();
    }


    @Get('/count')
    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    @ApiOperation({ summary: 'get total artist' })
    async getCountArtist(): Promise<number> {
        return this.artistService.countArtist();
    }
}