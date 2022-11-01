import {  IsNotEmpty, IsString, IsEnum } from "class-validator";
import { AudioStatus } from "../audioStatus.enum";


export class CreateAudioDto{

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    image_url:string;

    @IsNotEmpty()
    @IsEnum(AudioStatus)
    audio_status:AudioStatus;

    @IsNotEmpty()
    @IsString()
    length:string;

}