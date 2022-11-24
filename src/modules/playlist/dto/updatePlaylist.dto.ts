import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PlaylistStatus } from "../enum/playlistStatus.enum";

export class UpdatePlaylistDto {
    
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    id?: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    image_url: string;

    @ApiProperty({ enum: PlaylistStatus })
    @IsOptional()
    @IsEnum(PlaylistStatus)
    status: PlaylistStatus;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @IsOptional()
    description: string;

    user_id?: number;


}
export default UpdatePlaylistDto;