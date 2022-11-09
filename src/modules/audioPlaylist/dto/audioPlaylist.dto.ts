import { ApiProperty } from "@nestjs/swagger";
import {  IsOptional } from "class-validator";
import PlaylistDto from "src/modules/playlist/dto/playlist.dto";




export class AudioPlaylistDto{



    @ApiProperty()
    @IsOptional()
    playlist:PlaylistDto;


}
export default AudioPlaylistDto;