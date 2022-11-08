import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AudioController from 'src/audio/audio.controller';
import AudioService from 'src/audio/audio.services';
import AudioPlaylist from 'src/audioPlaylist/entities/audioPlaylist.entity';
import { PlaylistModule } from 'src/module/playlist.module';


@Module({
    imports: [TypeOrmModule.forFeature([Audio,AudioPlaylist]), PlaylistModule],
    controllers: [AudioController],
    providers: [AudioService],

  
})
export class AudioModule {}