import { USER_CLIENT_ROLE } from "src/common/enums/userClientRole.enum";
import { WalletService } from "./wallet.service";
import { WalletEntity } from "./entities/wallet.entity";
import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "nest-keycloak-connect";

@ApiTags('Wallet')
@Controller('wallets')
@ApiBearerAuth()
export default class WalletController {
    constructor(private readonly walletService: WalletService) { }

    @Get(':artistId')
    @Roles({ roles: [USER_CLIENT_ROLE.ARTIST] })
    async findWallet(
        @Param('artistId') artistId: string,
    ): Promise<WalletEntity[]> {
        return this.walletService.findWallet(artistId);
    }
}