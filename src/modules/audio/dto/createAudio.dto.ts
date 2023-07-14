import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from 'class-validator';
import { IsFileType } from 'src/decorator/fileType.decorator';

export class CreateAudioDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: [Number], required: false })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.split(','))
  playlistId?: number[];

  @ApiProperty({ type: [Number] })
  @IsArray()
  @Transform(({ value }) => value.split(','))
  genreId: number[];

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsFileType(['audio/mpeg', 'audio/wav'])
  audio: Express.Multer.File;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsFileType(['audio/mpeg', 'audio/wav'])
  image: Express.Multer.File;
}
