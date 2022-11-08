import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PlaylistController from '../playlist/playlist.controller';
import { Playlist } from '../playlist/entities/playlist.entity';
import PlaylistService from '../playlist/playlist.service';

@Module({
    imports: [TypeOrmModule.forFeature([Playlist])],
    controllers: [PlaylistController],
    providers: [PlaylistService],
    exports:[PlaylistService]
})
export class PlaylistModule {}