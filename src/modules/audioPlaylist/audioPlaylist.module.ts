import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AudioPlaylistEntity } from "./entities/audioPlaylist.entity";
import AudioPlaylistController from "./audioPlaylist.controller";
import AudioPlaylistService from "./audioPlaylist.services";
import { PlaylistModule } from "../playlist/playlist.module";

@Module({
    imports: [TypeOrmModule.forFeature([AudioPlaylistEntity]), PlaylistModule],
    controllers: [AudioPlaylistController],
    providers: [AudioPlaylistService],
})
export class AudioPlaylistModule { }