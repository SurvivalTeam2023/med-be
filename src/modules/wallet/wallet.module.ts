import { Module } from "@nestjs/common";
import { WalletEntity } from "./entities/wallet.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import WalletController from "./wallet.controller";
import { WalletService } from "./wallet.service";

@Module({
    imports: [TypeOrmModule.forFeature([WalletEntity])],
    controllers: [WalletController],
    providers: [WalletService],
})
export class WalletModule { }