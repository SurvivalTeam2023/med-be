import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class likeSongDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    audioId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isLiked: boolean;
}