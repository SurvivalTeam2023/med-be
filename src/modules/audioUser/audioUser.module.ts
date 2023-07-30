import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PlaylistModule } from "../playlist/playlist.module";
import { AudioUserEntity } from "./entities/audioUser.entity";
import AudioUserService from "./audioUser.services";
import AudioUserController from "./audioUser.controller";

@Module({
    imports: [TypeOrmModule.forFeature([AudioUserEntity])],
    controllers: [AudioUserController],
    providers: [AudioUserService],
})
export class AudioUserModule { }