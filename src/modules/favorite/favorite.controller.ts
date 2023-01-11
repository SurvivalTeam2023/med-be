/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import FavoriteService from './favorite.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { USER_CLIENT_ROLE } from 'src/common/enums/userClientRole.enum';
import CreateFavoriteDTO from './dto/createFavorite.dto';
import { FavoriteEntity } from './entities/favorite.entity';
import { SubscriptionTypeEntity } from '../subscriptionType/entities/subscriptionType.entity';
import DeleteFavoriteDTO from './dto/deleteFavorite.dto';

@ApiTags('Favorite')
@Controller('Favorite')
@ApiBearerAuth()
@Controller('rest/favorite')
export default class FavoriteController {
  constructor(private readonly Favoriteservice: FavoriteService) {}

  @ApiOperation({ summary: 'create Favorite' })
  @Unprotected()
  @Post()
  async create(@Body() dto: CreateFavoriteDTO): Promise<FavoriteEntity> {
    return this.Favoriteservice.createfavorite(dto);
  }

  @ApiOperation({ summary: 'delete Favorite' })
  @Unprotected()
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.Favoriteservice.deleteFavorite(id);
  }

  @ApiOperation({ summary: 'find Favorite by userId' })
  @Get(':userId')
  @Unprotected()
  async getAllFavorite(
    @Param('userId') userId: string,
  ): Promise<FavoriteEntity[]> {
    return this.Favoriteservice.findAllFavorite(userId);
  }
}
