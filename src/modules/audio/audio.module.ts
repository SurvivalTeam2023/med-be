import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AudioController from 'src/modules/audio/audio.controller';
import AudioService from 'src/modules/audio/audio.services';
import { AudioEntity } from './entities/audio.entity';
import { AudioPlaylistEntity } from '../audioPlaylist/entities/audioPlaylist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AudioEntity, AudioPlaylistEntity])],
  controllers: [AudioController],
  providers: [AudioService],
})
export class AudioModule { }
