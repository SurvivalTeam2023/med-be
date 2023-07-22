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
  playlistId?: number[];

  @ApiProperty({ type: [Number] })
  @IsArray()
  genreId: number[];

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  audioFileId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  imageFileId: number;
}
