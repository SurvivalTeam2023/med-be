/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EmotionEnum } from 'src/common/enums/emotion.enum';
import { GenreStatus } from 'src/common/enums/genreStatus.enum';

export class UpdateGenreDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  desc: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image: string;

  @ApiProperty({ enum: GenreStatus, default: GenreStatus.ACTIVE })
  status: GenreStatus;

  @ApiProperty({ enum: EmotionEnum, })
  emotion: EmotionEnum;
}
export default UpdateGenreDTO;
