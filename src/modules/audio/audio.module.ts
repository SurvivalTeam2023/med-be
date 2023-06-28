import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AudioController from 'src/modules/audio/audio.controller';
import AudioService from 'src/modules/audio/audio.services';
import { AudioEntity } from './entities/audio.entity';
import { AudioPlaylistEntity } from '../audioPlaylist/entities/audioPlaylist.entity';
import { GenreModule } from '../genre/genre.module';
import { FilesModules } from '../files/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([AudioEntity, AudioPlaylistEntity]), GenreModule, FilesModules],
  controllers: [AudioController],
  providers: [AudioService],
})
export class AudioModule { }
