import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import AudioPlaylist from "src/audioPlaylist/entities/audioPlaylist.entity";
import { PlaylistStatus } from "../enum/playlistStatus.enum";


export class SearchPlaylistDto{


    @ApiProperty({required:false})
    @IsOptional()
    @IsString()
    name:string;


    @ApiProperty({enum:PlaylistStatus, required:false})
    @IsOptional()
    playlist_status:PlaylistStatus;




}
export default SearchPlaylistDto;