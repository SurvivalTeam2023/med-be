import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createAudioPlaylistDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    playlistId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    audioId: number;
}