import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import ArtistEntity from "./entities/artist.entity";

@Injectable()
export default class ArtistService {
    constructor(
        @InjectRepository(ArtistEntity)
        private artistRepo: Repository<ArtistEntity>,
    ) { }
    async countArtist(): Promise<number> {
        return await this.artistRepo.count()
    }
}