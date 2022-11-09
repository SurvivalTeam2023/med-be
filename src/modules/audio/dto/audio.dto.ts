import { ApiProperty } from "@nestjs/swagger";
import {  IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import AudioPlaylistDto from "src/modules/audioPlaylist/dto/audioPlaylist.dto";
import { AudioStatus } from "../enum/audioStatus.enum";


export class AudioDTO{
    @ApiProperty()
    id:number;

    @ApiProperty()
    name:string;

    @ApiProperty()
    image_url:string;

    @ApiProperty({enum:AudioStatus, default:AudioStatus.ACTIVE})
    audio_status:AudioStatus;

    @ApiProperty()
    length:string;


    @ApiProperty()
    audio_playlist:AudioPlaylistDto[];


}
export default AudioDTO;