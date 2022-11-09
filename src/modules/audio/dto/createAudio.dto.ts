import { ApiProperty } from "@nestjs/swagger";
import {  IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { AudioStatus } from "../enum/audioStatus.enum";


export class CreateAudioDTO{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    image_url:string;

    @ApiProperty({enum:AudioStatus,default:AudioStatus.ACTIVE})
    audio_status:AudioStatus;

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    length:string;

    @ApiProperty({ type: [Number] })
    @IsOptional()
    @IsArray()
    playlist_id?:number[];

}
export default CreateAudioDTO;