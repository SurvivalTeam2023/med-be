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
import { Transform, Type } from 'class-transformer';

export class CreateAudioDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: [Number], required: false })
  @IsOptional()
  playlistId: number[];

  @ApiProperty({ type: [Number] })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.split(','))
  genreId: number[];

  @ApiProperty({ type: 'string', format: 'binary' })
  audio: Express.Multer.File;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: Express.Multer.File;


}
export default CreateAudioDTO;
