import { ApiProperty } from "@nestjs/swagger";
import {  IsOptional } from "class-validator";
import AudioDto from "src/audio/dto/searchAudio.dto";
import PlaylistDto from "src/playlist/dto/playlist.dto";



export class AudioPlaylistDto{



    @ApiProperty()
    @IsOptional()
    playlist:PlaylistDto;


}
export default AudioPlaylistDto;