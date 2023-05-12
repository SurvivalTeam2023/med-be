import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FollowedArtistEntity } from "./entities/followedArtist.entity";
import FollowedArtistService from "./followedArtist.service";
import FollowedArtistController from "./followedArtist.controller";

@Module({
    imports: [TypeOrmModule.forFeature([FollowedArtistEntity])],
    controllers: [FollowedArtistController],
    providers: [FollowedArtistService],
})
export class FollowedArtistModule { }