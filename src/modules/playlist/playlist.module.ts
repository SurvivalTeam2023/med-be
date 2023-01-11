/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from 'src/modules/playlist/entities/playlist.entity';
import PlaylistController from 'src/modules/playlist/playlist.controller';
import PlaylistService from 'src/modules/playlist/playlist.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity])],
  controllers: [PlaylistController],
  providers: [PlaylistService],
  exports: [PlaylistService],
})
export class PlaylistModule {}
