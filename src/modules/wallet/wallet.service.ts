import { InjectRepository } from "@nestjs/typeorm";
import { WalletEntity } from "./entities/wallet.entity";
import { EntityManager, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(WalletEntity)
        private walletRepo: Repository<WalletEntity>,
        private readonly entityManage: EntityManager,
    ) { }
    async findWallet(artistId: string): Promise<WalletEntity[]> {
        const wallet = this.walletRepo
            .createQueryBuilder('wallet')
            .leftJoin('wallet.artist', 'artist')
            .where('artist.id = :artistId', { artistId: artistId })
            .getMany();

        return wallet;
    }
}