import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { PlaylistStatus } from "../enum/playlistStatus.enum";


export class SearchPlaylistDto {

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({ enum: PlaylistStatus, required: false })
    status: PlaylistStatus;

}
export default SearchPlaylistDto;