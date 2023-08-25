import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { GenreStatus } from 'src/common/enums/genreStatus.enum';

export class FindGenreDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    enum: GenreStatus,
    required: false,
    default: GenreStatus.ACTIVE,
  })
  @IsOptional()
  status: GenreStatus;

}
export default FindGenreDTO;
