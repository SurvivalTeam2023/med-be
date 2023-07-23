import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class likeSongDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    audioId: number;
}