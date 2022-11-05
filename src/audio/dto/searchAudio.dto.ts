import { ApiProperty } from "@nestjs/swagger";
import {  IsNumber, IsOptional, IsString } from "class-validator";
import { AudioStatus } from "../audioStatus.enum";


export class SearchAudioDto{

    @ApiProperty({ required: false})
    @IsOptional()
    @IsString()
    name:string;


    @ApiProperty({enum:AudioStatus, required: false})
    @IsOptional()
    audio_status:AudioStatus;


    @ApiProperty({ required: false})
    @IsOptional()
    playlist_id:number;


}
export default SearchAudioDto;