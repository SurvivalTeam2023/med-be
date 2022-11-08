import { ApiProperty } from "@nestjs/swagger";
import {  IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { AudioStatus } from "../audioStatus.enum";


export class CreateAudioDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    image_url:string;

    @ApiProperty({enum:AudioStatus})
    audio_status:AudioStatus;

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    length:string;


    @ApiProperty({ type: [Number] })
    @IsOptional()
    @IsArray()
    playlist_id:number[];


}
export default CreateAudioDto;