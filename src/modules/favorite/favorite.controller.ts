/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import FavoriteService from './favorite.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Unprotected } from 'nest-keycloak-connect';
import CreateFavoriteDTO from './dto/createFavorite.dto';
import { FavoriteGenreEntity } from './entities/favorite.entity';
import { RequestPayload } from 'src/decorator/requestPayload.decorator';

@ApiTags('Favorites')
@Controller('favorite')
@ApiBearerAuth()
@Controller('rest/favorite')
export default class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) { }

  @ApiOperation({ summary: 'create Favorite' })
  @Unprotected()
  @Post()
  async create(
    @Body() dto: CreateFavoriteDTO,
    @RequestPayload() token: string,
  ): Promise<FavoriteGenreEntity[]> {
    return this.favoriteService.createFavorite(dto, token);
  }

  @ApiOperation({ summary: 'delete Favorite' })
  @Unprotected()
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.favoriteService.deleteFavorite(id);
  }

  @ApiOperation({ summary: 'find Favorite by userId' })
  @Get(':userId')
  @Unprotected()
  async getAllFavorite(
    @Param('userId') userId: string,
  ): Promise<FavoriteGenreEntity[]> {
    return this.favoriteService.findAllFavorite(userId);
  }

  @ApiOperation({ summary: 'Is favorite existed?' })
  @Get()
  @Unprotected()
  async isFavoriteExisted(
    @RequestPayload() token: string,
  ): Promise<{ exists: boolean }> {
    console.log('Received token:', token);
    const result = await this.favoriteService.isFavoriteExisted(token);
    return { exists: result.exists };
  }
}
