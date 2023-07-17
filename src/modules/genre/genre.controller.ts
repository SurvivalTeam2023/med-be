import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Query,
} from '@nestjs/common';

import GenreService from './genre.services';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { USER_CLIENT_ROLE } from 'src/common/enums/userClientRole.enum';
import { GenreEntity } from './entities/genre.entity';
import CreateGenreDTO from './dto/createGenre.dto';
import UpdateGenreDTO from './dto/updateGenre.dto';
import { Emotion } from '@aws-sdk/client-rekognition';

@ApiTags('Genres')
@Controller('genres')
@ApiBearerAuth()
export default class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get(':id')
  @Roles({ roles: [USER_CLIENT_ROLE.ARTIST] })
  @ApiOperation({ summary: 'get genre by id' })
  async getGenreById(@Param('id') id: number): Promise<GenreEntity> {
    return this.genreService.findGenreById(id);
  }

  @Get()
  @Unprotected()
  @ApiOperation({ summary: 'get genre list' })
  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
  })
  async getGenres(@Query('name') name: string): Promise<GenreEntity[]> {
    return this.genreService.findGenres(name);
  }

  @Post('emotion')
  @Unprotected()
  @ApiOperation({ summary: 'get genre by emotion' })
  async getGenreByEmotion(@Body() emotions: Emotion[]) {
    return await this.genreService.getGenreByEmotion(emotions);
  }

  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  @Post()
  @ApiOperation({ summary: 'create genre' })
  async createGenre(@Body() dto: CreateGenreDTO): Promise<GenreEntity> {
    return this.genreService.createGenre(dto);
  }

  @Put(':id')
  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  @ApiOperation({ summary: 'update genre ' })
  async updateGenre(
    @Param('id') id: number,
    @Body() updateGenreDto: UpdateGenreDTO,
  ): Promise<GenreEntity> {
    return await this.genreService.updateGenre(id, updateGenreDto);
  }

  @Delete(':id')
  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  @ApiOperation({ summary: 'delete genre ' })
  async deleteAudio(@Param('id') id: number) {
    return await this.genreService.deleteGenre(id);
  }
  // @Get('/questionBank/:id')
  // @Unprotected()
  // @ApiOperation({ summary: 'get genre by result from quiz' })
  // async getGenreByResult(@Param('id') questionBankId: number): Promise<GenreEntity[]> {
  //   return await this.genreService.getGenreByResult(questionBankId)
  // }
}
