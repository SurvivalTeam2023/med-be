import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty, IsOptional, IsString } from "class-validator";
import { AudioStatus } from "../audioStatus.enum";


export class CreateAudioDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    image_url:string;

    @ApiProperty({enum:AudioStatus})
    @IsOptional()
    audio_status:AudioStatus;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @IsOptional()
    length:string;


    @ApiProperty()
    @IsOptional()
    playlist_id:number;


}
export default CreateAudioDto;