/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteGenreEntity } from './entities/favorite.entity';
import FavoriteController from './favorite.controller';
import FavoriteService from './favorite.service';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteGenreEntity])],
  providers: [FavoriteService],
  controllers: [FavoriteController],
  exports: [FavoriteService],
})
export class FavoriteModule { }
