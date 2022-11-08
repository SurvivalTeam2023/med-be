import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import {  IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { AudioStatus } from "../audioStatus.enum";


export class UpdateAudioDto{
    

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
    @IsString()
    @ApiProperty()
    length:string;


}
export default UpdateAudioDto;