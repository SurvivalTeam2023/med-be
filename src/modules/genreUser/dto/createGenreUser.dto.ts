import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateGenreUserDTO {
  @ApiProperty({ type: [Number] })
  @IsNotEmpty()
  @IsArray()
  genreId: number[];
}
export default CreateGenreUserDTO;
