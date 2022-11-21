import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { AudioStatus } from "../enum/audioStatus.enum";


export class UpdateAudioDTO{
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    image_url:string;

    @ApiProperty({enum:AudioStatus, default:AudioStatus.ACTIVE})
    status:AudioStatus;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    length:string;

}
export default UpdateAudioDTO;