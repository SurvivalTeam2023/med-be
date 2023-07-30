import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchGenreUserDTO {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  genreId: number;
}
