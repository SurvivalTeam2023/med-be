import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import AudioPlaylist from "src/modules/audioPlaylist/entities/audioPlaylist.entity";
import { PlaylistStatus } from "../enum/playlistStatus.enum";

export class PlaylistDto {

    @ApiProperty()
    @IsOptional()
    id: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({ enum: PlaylistStatus })
    @IsOptional()
    status: PlaylistStatus;

}
export default PlaylistDto;