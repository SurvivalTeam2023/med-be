import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AudioPlaylistEntity } from "./entities/audioPlaylist.entity";
import AudioPlaylistController from "./audioPlaylist.controller";
import AudioPlaylistService from "./audioPlaylist.services";

@Module({
    imports: [TypeOrmModule.forFeature([AudioPlaylistEntity])],
    controllers: [AudioPlaylistController],
    providers: [AudioPlaylistService],
})
export class AudioPlaylistModule { }