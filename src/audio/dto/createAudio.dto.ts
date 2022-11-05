import { ApiProperty } from "@nestjs/swagger";
import {  IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { AudioStatus } from "../audioStatus.enum";


export class CreateAudioDto{
    @ApiProperty()
    @IsNotEmpty()
    name:string;

    @ApiProperty()
    @IsNotEmpty()

    image_url:string;

    @ApiProperty({enum:AudioStatus})
    audio_status:AudioStatus;

    @IsNotEmpty()
    @ApiProperty()
    length:string;


    @ApiProperty({ type: [Number] })
    @IsOptional()
    @IsArray()
    playlist_id:number[];


}
export default CreateAudioDto;