import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { GenreStatus } from 'src/common/enums/genreStatus.enum';

export class UpdateGenreDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  desc: string;

  @ApiProperty({ enum: GenreStatus, default: GenreStatus.ACTIVE })
  status: GenreStatus;
}
export default UpdateGenreDTO;
