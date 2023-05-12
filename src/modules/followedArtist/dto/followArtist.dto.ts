import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class followArtistDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    artistId: string;

}