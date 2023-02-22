/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { AudioStatus } from '../../../common/enums/audioStatus.enum';

export class CreateAudioDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @ApiProperty({ enum: AudioStatus, default: AudioStatus.ACTIVE })
  status: AudioStatus;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  length: string;

  @ApiProperty({ type: [Number] })
  @IsOptional()
  @IsArray()
  playlistId: number[];

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  artistId: string;

  @IsNotEmpty()
  @ApiProperty({ type: [Number] })
  @IsArray()
  genreId: number[];
}
export default CreateAudioDTO;
