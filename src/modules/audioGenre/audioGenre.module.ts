/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioGenreController } from './audioGenre.controller';
import { AudioGenreEntity } from './entities/audioGenre.entities';
import { AudioGenreService } from './audioGenre.service';

@Module({
  imports: [TypeOrmModule.forFeature([AudioGenreEntity])],
  providers: [AudioGenreService],
  controllers: [AudioGenreController],
  exports: [AudioGenreService],
})
export class AudioGenreModule {}
