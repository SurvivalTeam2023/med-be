import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { AudioUserEntity } from "./entities/audioUser.entity";
import { getUserId } from "src/utils/decode.utils";
import UserEntity from "../user/entities/user.entity";
import { AudioEntity } from "../audio/entities/audio.entity";
import { ErrorHelper } from "src/helpers/error.helper";
import { ERROR_MESSAGE } from "src/common/constants/messages.constant";
import SearchLikedAudioDTO from "./dto/searchLikedAudio.dto";

@Injectable()
export default class AudioUserService {
    constructor(

        private readonly entityManage: EntityManager,
        @InjectRepository(AudioUserEntity)
        private audioUserRepo: Repository<AudioUserEntity>,
    ) { }

    async getLikedAudio(dto: SearchLikedAudioDTO, token: string): Promise<{ audio: AudioEntity, isLiked: boolean }[]> {
        const userId = getUserId(token)
        const audioUser = await this.audioUserRepo
            .createQueryBuilder('audio_user')
            .leftJoinAndSelect('audio_user.audio', 'audio')
            .leftJoinAndSelect('audio_user.user', 'user')
            .leftJoinAndSelect('audio.audioFile', 'audioFile')
            .leftJoinAndSelect('audioFile.file', 'file')
            .leftJoinAndSelect('audio.artist', 'artist')
            .leftJoinAndSelect('audio.audioGenre', 'audioGenre')
            .leftJoinAndSelect('audioGenre.genre', 'genre')
            .where('user.id = :userId', { userId: userId })
        if (dto.name) {
            audioUser.andWhere('audio.name like :name', { name: dto.name })
        }

        audioUser.select(['audio_user.id', 'audio', 'artist.artist_name', 'audioFile.id', 'file.url', 'audioGenre.id', 'genre.name'])
        if (!audioUser) { ErrorHelper.NotFoundException(ERROR_MESSAGE.AUDIO.NOT_FOUND) }

        const audios = (await audioUser.getMany()).map(e => {
            return { audio: e.audio, isLiked: true }
        })
        return audios
    }



    async updateIsLiked(audioId: number, isLiked: boolean, token: string): Promise<{ audio: AudioEntity, isLiked: boolean }> {

        const userId = getUserId(token);
        const user = await this.entityManage.findOne(UserEntity, {
            where: {
                id: userId
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

            const audioUser = await this.audioUserRepo.save({
                audio: audio,
                user: user,
                audioId: audio.id,
                userId: user.id
            })
            audio.liked++
            await this.entityManage.save(audio)

            return {
                audio: audio,
                isLiked: isLiked
            }
        } else if (isLiked == false) {
            const audioPlaylist = await this.audioUserRepo.findOne({
                where: {
                    audioId: audio.id,
                    userId: user.id
                }
            })
            await this.audioUserRepo.remove(audioPlaylist)
            audio.liked--
            await this.entityManage.save(audio)
            return {
                audio: audio,
                isLiked: isLiked
            }
        }
    }
}