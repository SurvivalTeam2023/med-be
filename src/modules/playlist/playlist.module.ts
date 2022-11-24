import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from 'src/modules/playlist/entities/playlist.entity';
import PlaylistController from 'src/modules/playlist/playlist.controller';
import PlaylistService from 'src/modules/playlist/playlist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist])],
  controllers: [PlaylistController],
  providers: [PlaylistService],
  exports: [PlaylistService],
})
export class PlaylistModule {}
