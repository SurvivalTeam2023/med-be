import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { PlaylistStatus } from "../enum/playlistStatus.enum";


export class SearchPlaylistDto {

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({ enum: PlaylistStatus, required: false })
    @IsOptional()
    playlist_status: PlaylistStatus;

}
export default SearchPlaylistDto;