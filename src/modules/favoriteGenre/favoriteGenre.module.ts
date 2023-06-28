/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteGenreEntity } from './entities/favoriteGenre.entity';
import FavoriteGenreService from './favoriteGenre.service';
import FavoriteGenreController from './favoriteGenre.controller';


@Module({
  imports: [TypeOrmModule.forFeature([FavoriteGenreEntity])],
  providers: [FavoriteGenreService],
  controllers: [FavoriteGenreController],
  exports: [FavoriteGenreService],
})
export class FavoriteGenreModule { }
