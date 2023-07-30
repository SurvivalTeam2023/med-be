import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Unprotected } from 'nest-keycloak-connect';
import CreateFavoriteDTO from './dto/createFavorite.dto';
import { FavoriteGenreEntity } from './entities/favoriteGenre.entity';
import { RequestPayload } from 'src/decorator/requestPayload.decorator';
import FavoriteGenreService from './favoriteGenre.service';

@ApiTags('Favorites')
@Controller('favorite')
@ApiBearerAuth()
@Controller('rest/favorite')
export default class FavoriteGenreController {
  constructor(private readonly favoriteService: FavoriteGenreService) { }

  @ApiOperation({ summary: 'create Favorite genre' })
  @Unprotected()
  @Post()
  async create(
    @Body() dto: CreateFavoriteDTO,
    @RequestPayload() token: string,
  ): Promise<FavoriteGenreEntity[]> {
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
  ): Promise<FavoriteGenreEntity[]> {
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
