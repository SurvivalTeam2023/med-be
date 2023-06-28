/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { AudioStatus } from '../../../common/enums/audioStatus.enum';
import { Transform, Type } from 'class-transformer';
import { FileTypeValidator } from 'src/decorator/fileType.decorator';

export class CreateAudioDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: [Number], required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => value.split(','))
  playlistId: number[];

  @ApiProperty({ type: [Number] })
  @IsArray()
  @IsNumber()
  @Transform(({ value }) => value.split(','))
  genreId: number[];

  @ApiProperty({ type: 'string', format: 'binary' })
  @Validate(FileTypeValidator, [['audio/mpeg', 'audio/wav']])
  audio: Express.Multer.File;

  @ApiProperty({ type: 'string', format: 'binary' })
  @Validate(FileTypeValidator, [['image/jpeg']])
  image: Express.Multer.File;


}
export default CreateAudioDTO;
