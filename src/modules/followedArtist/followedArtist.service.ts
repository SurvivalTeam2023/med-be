import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { FollowedArtistEntity } from "./entities/followedArtist.entity";
import { getUserId } from "src/utils/decode.utils";
import ArtistEntity from "../artist/entities/artist.entity";
import UserEntity from "../user/entities/user.entity";
import { followArtistDTO } from "./dto/followArtist.dto";

@Injectable()
export default class FollowedArtistService {
    constructor(
        private readonly entityManage: EntityManager,
        @InjectRepository(FollowedArtistEntity)
        private followedArtistRepo: Repository<FollowedArtistEntity>,
    ) { }

    async followArtist(dto: followArtistDTO, token: string): Promise<FollowedArtistEntity> {
        const userId = getUserId(token);
        const user = await this.entityManage.findOne(UserEntity, {
            where: {
                id: userId
            }
        })
        const artist = await this.entityManage.findOne(ArtistEntity, {
            where: {
                id: dto.artistId
            }
        })
        const followArtist = await this.followedArtistRepo.save({
            user: user,
            artist: artist
        })
        return followArtist
    }

    async showTotalFollower(artistId: string): Promise<number> {
        return await this.followedArtistRepo.count({
            where: {
                artistId: artistId
            }
        })

    }
    async unfollowArtist(artistId: string, token: string): Promise<any> {
        const userId = getUserId(token);
        const followedArtist = await this.followedArtistRepo.find({
            where: {
                userId: userId,
                artistId: artistId
            }
        })
        await this.followedArtistRepo.remove(followedArtist)

        return followedArtist
    }
}