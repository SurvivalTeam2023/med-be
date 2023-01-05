import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Patch
} from '@nestjs/common';
import GenreService from "./genre.services";
import { Roles } from "nest-keycloak-connect";
import { USER_CLIENT_ROLE } from "src/common/enums/user-client-role.enum";
import { GenreEntity } from "./entities/genre.entity";
import CreateGenreDTO from "./dto/createGenre.dto";
import UpdateGenreDTO from "./dto/updateGenre.dto";
import AddGenreToAudioDTO from "./dto/addGenreToAudio.dto";

@ApiTags('Genres')
@Controller('genres')
@ApiBearerAuth()
export default class GenreController {
    constructor(private readonly genreService: GenreService) { }

    @Get(':id')
    @Roles({ roles: [USER_CLIENT_ROLE.ARTIST] })
    async getGenreById(@Param('id') id: number): Promise<GenreEntity> {
        return this.genreService.findGenreById(id);
    }

    @Get()
    @Roles({ roles: [USER_CLIENT_ROLE.ARTIST] })
    async getGenres(): Promise<GenreEntity[]> {
        return this.genreService.findGenres();
    }

    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    @Post()
    async createGenre(@Body() dto: CreateGenreDTO): Promise<GenreEntity> {
        return this.genreService.createGenre(dto);
    }


    @Roles({ roles: [USER_CLIENT_ROLE.ARTIST] })
    @Patch("audioGenre")
    async addGenreToAudio(@Body() dto: AddGenreToAudioDTO): Promise<GenreEntity> {
        return this.genreService.addGenreToAudio(dto);
    }

    @Put(':id')
    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    async updateAudio(
        @Param('id') id: number,
        @Body() updateGenreDto: UpdateGenreDTO,
    ): Promise<GenreEntity> {
        return await this.genreService.updateGenre(id, updateGenreDto);
    }

    @Delete(':id')
    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    async deleteAudio(@Param('id') id: number) {
        return await this.genreService.deleteGenre(id);
    }
}