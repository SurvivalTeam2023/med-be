/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreEntity } from './entities/genre.entity';
import GenreController from './genre.controller';
import GenreService from './genre.services';

@Module({
  imports: [TypeOrmModule.forFeature([GenreEntity])],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
