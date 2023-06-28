import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import ArtistEntity from "./entities/artist.entity";
import { PlaylistEntity } from "../playlist/entities/playlist.entity";

@Injectable()
export default class ArtistService {
    constructor(
        @InjectRepository(ArtistEntity)
        private artistRepo: Repository<ArtistEntity>,
    ) { }

    async getArtistByID(id: string): Promise<ArtistEntity> {
        const artist = await this.artistRepo.createQueryBuilder('artist')
            .leftJoinAndSelect('artist.audio', 'audio')
            .leftJoinAndSelect(PlaylistEntity, 'playlist', 'playlist.authorId=artist.id')
            .where('artist.id =:id', { id: id })
            .getOne()
        return artist
    }

    async getArtist(): Promise<ArtistEntity[]> {
        const artists = await this.artistRepo.createQueryBuilder('artist')
            .leftJoinAndSelect('artist.audio', 'audio')
            .leftJoinAndSelect(PlaylistEntity, 'playlist', 'playlist.authorId=artist.id')
            .getMany()
        return artists
    }

    async countArtist(): Promise<number> {
        return await this.artistRepo.count()
    }
}