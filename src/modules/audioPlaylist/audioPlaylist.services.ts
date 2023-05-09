import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { AudioEntity } from "../audio/entities/audio.entity";
import { AudioPlaylistEntity } from "./entities/audioPlaylist.entity";
import { PlaylistEntity } from "../playlist/entities/playlist.entity";
import { PlaylistType } from "src/common/enums/playlistType.enum";
import { createAudioPlaylistDTO } from "./dto/createAudioPlaylist.dto";
import { getUserId } from "src/utils/decode.utils";

@Injectable()
export default class AudioPlaylistService {
    constructor(
        private readonly entityManage: EntityManager,
        @InjectRepository(AudioPlaylistEntity)
        private audioPlaylistRepository: Repository<AudioPlaylistEntity>,
    ) { }

    async addAudioToPlaylist(dto: createAudioPlaylistDTO, token: string): Promise<AudioPlaylistEntity> {
        const userId = getUserId(token);
        const playlist = await this.entityManage.findOne(PlaylistEntity, {
            where: {
                id: dto.playlistId,
                authorId: userId
            }
        })
        const audio = await this.entityManage.findOne(AudioEntity, {
            where: {
                id: dto.audioId
            }
        }
        )
        const audioPlaylist = await this.audioPlaylistRepository.save({
            audio: audio,
            playlist: playlist
        })
        if (playlist.playlistType == PlaylistType.LIKED) {
            audio.liked++
            await this.entityManage.save(audio)
        }
        return audioPlaylist
    }
    async removeAudioFromPlaylist(playlistId: number, audioId: number, token: string) {

        const userId = getUserId(token);
        const playlist = await this.entityManage.findOne(PlaylistEntity, {
            where: {
                id: playlistId,
                authorId: userId
            }
        })
        const audio = await this.entityManage.findOne(AudioEntity, {
            where: {
                id: audioId
            }
        }
        )
        const audioPlaylist = await this.audioPlaylistRepository.findOne({
            where: {
                audioId: audioId,
                playlistId: playlistId
            }
        })
        if (playlist.playlistType == PlaylistType.LIKED) {
            audio.liked--
            await this.entityManage.save(audio)
        }
        await this.audioPlaylistRepository.remove(audioPlaylist)
    }

}
