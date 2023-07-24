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

@Injectable()
export default class AudioPlaylistService {
    constructor(
        private readonly entityManage: EntityManager,
        private readonly playlistService: PlaylistService,
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
    async updateIsLiked(audioId: number, isLiked: boolean, token: string): Promise<any> {

        const userId = getUserId(token);
        let playlist = await this.entityManage.findOne(PlaylistEntity, {
            where: {
                playlistType: PlaylistType.LIKED,
                authorId: userId
            }
        })
        const audio = await this.entityManage.findOne(AudioEntity, {
            where: {
                id: audioId
            }
        }
        )
        if (isLiked == true) {
            if (!audio) {
                ErrorHelper.NotFoundException(ERROR_MESSAGE.AUDIO.NOT_FOUND)
            }
            if (!playlist) {
                const playlistDTO: CreatePlaylistDto = {
                    name: "Like Song",
                    isPublic: PlaylistPublic.PRIVATE,
                    playlistType: PlaylistType.LIKED,
                    description: "All of your liked song",
                }
                playlist = await this.playlistService.createPlaylist(playlistDTO, token)
            }
            const audioPlaylist = await this.audioPlaylistRepository.save({
                audioId: audio.id,
                playlistId: playlist.id,
                audio: audio,
                playlist: playlist
            })
            audio.liked++
            await this.entityManage.save(audio)

            return {
                audio: {
                    ...audio,
                    isLiked: isLiked
                },
                playlist
            }
        } else if (isLiked == false) {
            const audioPlaylist = await this.audioPlaylistRepository.findOne({
                relations: {
                    audio: true,
                    playlist: true
                }
                , where: {
                    audio: {
                        id: audio.id
                    },
                    playlist: {
                        id: playlist.id
                    }
                }
            })
            await this.audioPlaylistRepository.remove(audioPlaylist)
            audio.liked--
            await this.entityManage.save(audio)
            return {
                audio: {
                    ...audio,
                    isLiked: isLiked
                },
                playlist
            }
        }
    }

}
