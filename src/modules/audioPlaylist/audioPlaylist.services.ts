import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { AudioEntity } from "../audio/entities/audio.entity";
import { AudioPlaylistEntity } from "./entities/audioPlaylist.entity";
import { PlaylistEntity } from "../playlist/entities/playlist.entity";
import { PlaylistType } from "src/common/enums/playlistType.enum";
import { createAudioPlaylistDTO } from "./dto/createAudioPlaylist.dto";
import { getUserId } from "src/utils/decode.utils";
import { ERROR_MESSAGE } from "src/common/constants/messages.constant";
import { ErrorHelper } from "src/helpers/error.helper";
import CreatePlaylistDto from "../playlist/dto/createPlaylist.dto";
import { PlaylistPublic } from "src/common/enums/playlistPublic.enum";
import PlaylistService from "../playlist/playlist.service";
import { AudioUserEntity } from "../audioUser/entities/audioUser.entity";
import UserEntity from "../user/entities/user.entity";

@Injectable()
export default class AudioPlaylistService {
    constructor(
        private readonly entityManage: EntityManager,
        private readonly playlistService: PlaylistService,
        @InjectRepository(AudioPlaylistEntity)
        private audioPlaylistRepository: Repository<AudioPlaylistEntity>,
    ) { }

    async addAudioToPlaylist(dto: createAudioPlaylistDTO, token: string): Promise<AudioPlaylistEntity> {
        const existAudio = await this.audioPlaylistRepository.findOne({
            where: {
                playlistId: dto.playlistId,
                audioId: dto.audioId,
            }
        })
        if (existAudio) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.AUDIO_PLAYLIST.DUPLICATE)
        }
        const playlist = await this.entityManage.findOne(PlaylistEntity, {
            where: {
                id: dto.playlistId,
            }
        })
        const audio = await this.entityManage.findOne(AudioEntity, {
            where: {
                id: dto.audioId
            }
        }
        )
        if (!audio) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.AUDIO.NOT_FOUND)
        }
        if (!playlist) {
            ErrorHelper.NotFoundException(ERROR_MESSAGE.PLAYLIST.NOT_FOUND)
        }
        const audioPlaylist = await this.audioPlaylistRepository.save({
            audioId: audio.id,
            playlistId: playlist.id,
            audio: audio,
            playlist: playlist
        })

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
        await this.audioPlaylistRepository.remove(audioPlaylist)
    }
}