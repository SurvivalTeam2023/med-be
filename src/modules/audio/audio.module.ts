import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AudioController from 'src/modules/audio/audio.controller';
import AudioService from 'src/modules/audio/audio.services';
import { Audio } from 'src/modules/audio/entities/audio.entity';
import AudioPlaylist from 'src/modules/audioPlaylist/entities/audioPlaylist.entity';
import { PlaylistModule } from 'src/modules/playlist/playlist.module';

@Module({
  imports: [TypeOrmModule.forFeature([Audio, AudioPlaylist]), PlaylistModule],
  controllers: [AudioController],
  providers: [AudioService],
})
export class AudioModule {}
