import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Unprotected } from 'nest-keycloak-connect';
import CreateGenreUserDTO from './dto/createGenreUser.dto';
import { GenreUserEntity } from './entities/genreUser.entity';
import { RequestPayload } from 'src/decorator/requestPayload.decorator';
import GenreUserService from './genreUser.service';

@ApiTags('Favorites')
@Controller('favorite')
@ApiBearerAuth()
@Controller('rest/favorite')
export default class GenreUserController {
  constructor(private readonly favoriteService: GenreUserService) { }

  @ApiOperation({ summary: 'create Favorite genre' })
  @Unprotected()
  @Post()
  async create(
    @Body() dto: CreateGenreUserDTO,
    @RequestPayload() token: string,
  ): Promise<GenreUserEntity[]> {
    return this.favoriteService.createFavorite(dto, token);
  }

  @ApiOperation({ summary: 'delete Favorite genre' })
  @Unprotected()
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.favoriteService.deleteFavorite(id);
  }

  @ApiOperation({ summary: 'get Favorite genres list by userId' })
  @Get('/userId')
  @Unprotected()
  async getAllFavorite(
    @RequestPayload() token: string,
  ): Promise<GenreUserEntity[]> {
    return this.favoriteService.findAllFavorite(token);
  }

  @ApiOperation({ summary: 'Is favorite existed?' })
  @Get()
  @Unprotected()
  async isFavoriteExisted(
    @RequestPayload() token: string,
  ): Promise<{ exists: boolean }> {
    const result = await this.favoriteService.isFavoriteExisted(token);
    return { exists: result.exists };
  }

}
