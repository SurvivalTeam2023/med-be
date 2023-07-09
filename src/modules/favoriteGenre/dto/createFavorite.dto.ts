import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateFavoriteDTO {
  @ApiProperty({ type: [Number] })
  @IsNotEmpty()
  @IsArray()
  genreId: number[];
}
export default CreateFavoriteDTO;
