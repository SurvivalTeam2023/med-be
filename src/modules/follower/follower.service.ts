import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ERROR_MESSAGE } from "src/common/constants/messages.constant";
import { ErrorHelper } from "src/helpers/error.helper";
import { getUserId } from "src/utils/decode.utils";
import { Repository } from "typeorm";
import { EntityManager } from "typeorm/entity-manager/EntityManager";
import { PlaylistEntity } from "../playlist/entities/playlist.entity";
import UserEntity from "../user/entities/user.entity";
import { FollowerEntity } from "./entities/follower.entity";

@Injectable()
export default class FollowerService {
    constructor(
        private readonly entityManage: EntityManager,
        @InjectRepository(FollowerEntity)
        private followerRepo: Repository<FollowerEntity>,
    ) { }

    async followPlaylist(playlistId: number, token: string): Promise<FollowerEntity> {
        let subscriberId = getUserId(token);
        const user = await this.entityManage.findOne(UserEntity, {
            where: {
                id: subscriberId
            }
        })
        const playList = await this.entityManage.findOne(PlaylistEntity, {
            where: {
                id: playlistId
            }
        })
        const follower = await this.followerRepo.save({
            playlist: playList,
            user: user
        })
        return follower
    }
}