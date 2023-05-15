import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { WalletStatus } from "src/common/enums/walletStatus.enum";

export class CreateWalletDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    bankName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    bankAccountNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    bankAccountOwner: string;

}