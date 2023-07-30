import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ERROR_MESSAGE } from "src/common/constants/messages.constant";
import { ErrorHelper } from "src/helpers/error.helper";
import { getUserId } from "src/utils/decode.utils";
import { Repository } from "typeorm";
import { EntityManager } from "typeorm/entity-manager/EntityManager";
import { PlaylistEntity } from "../playlist/entities/playlist.entity";
import UserEntity from "../user/entities/user.entity";
import { PlaylistUserEntity } from "./entities/playlist_user.entity"; 
import CreateFollowerDTO from "./dto/createPlaylistUser.dto";

@Injectable()
export default class PlaylistUserService {
    constructor(
        private readonly entityManage: EntityManager,
        @InjectRepository(PlaylistUserEntity)
        private followerRepo: Repository<PlaylistUserEntity>,
    ) { }


    async getFollowPlaylist(token: string): Promise<any> {
        const userId = getUserId(token)
        const querybuilder = this.followerRepo
            .createQueryBuilder('playlist_user')
            .leftJoinAndSelect('playlist_user.playlist', 'playlist')
            .leftJoinAndSelect('playlist.audioPlaylist', 'audioPlaylist')
            .leftJoinAndSelect('audioPlaylist.audio', 'audio')
            .leftJoinAndSelect('audio.audioFile', 'audioFile')
            .leftJoinAndSelect('audioFile.file', 'file')
            .select(['playlist_user', 'playlist', 'audioPlaylist.id', 'audio', 'audioFile', 'file'])
            .where('playlist_user.subscriber_id = :userId', { userId: userId })
            .getMany();
        return querybuilder;
    }
    async followPlaylist(dto: CreateFollowerDTO, token: string): Promise<PlaylistUserEntity> {
        let subscriberId = getUserId(token);
        const user = await this.entityManage.findOne(UserEntity, {
            where: {
                id: subscriberId
            }
        })
        const playList = await this.entityManage.findOne(PlaylistEntity, {
            where: {
                id: dto.playlistId
            }
        })
        const follower = await this.followerRepo.save({
            playlist: playList,
            user: user
        })
        return follower
    }
}