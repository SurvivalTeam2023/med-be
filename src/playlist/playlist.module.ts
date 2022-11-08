import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PlaylistController from './playlist.controller';
import { Playlist } from './playlist.entity';
import PlaylistService from './playlist.service';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Playlist])],
    controllers: [PlaylistController],
    providers: [PlaylistService],
    exports:[PlaylistService]

  
})
export class PlaylistModule {}