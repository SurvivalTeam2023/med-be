import { ApiProperty } from "@nestjs/swagger";
import {  IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import AudioPlaylistDto from "src/audioPlaylist/dto/audioPlaylist.dto";
import { AudioStatus } from "../audioStatus.enum";


export class AudioDto{
    @ApiProperty()
    id:number;

    @ApiProperty()
    name:string;

    @ApiProperty()
    image_url:string;

    @ApiProperty({enum:AudioStatus})
    @IsEnum(AudioStatus)
    audio_status:AudioStatus;

    @ApiProperty()
    length:string;


    @ApiProperty()
    audio_playlist:AudioPlaylistDto[];


}
export default AudioDto;