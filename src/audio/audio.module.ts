import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AudioPlaylist from 'src/audioPlaylist/audioPlaylist.entity';
import { PlaylistModule } from 'src/playlist/playlist.module';
import AudioController from './audio.controller';
import { Audio } from './audio.entity';
import AudioService from './audio.services';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Audio,AudioPlaylist]), PlaylistModule],
    controllers: [AudioController],
    providers: [AudioService],

  
})
export class AudioModule {}