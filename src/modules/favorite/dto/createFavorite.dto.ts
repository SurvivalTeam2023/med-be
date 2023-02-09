/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFavoriteDTO {
 

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  genreId: number;
}
export default CreateFavoriteDTO;
