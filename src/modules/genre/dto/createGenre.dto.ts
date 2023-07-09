import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { EmotionEnum } from 'src/common/enums/emotion.enum';
import { GenreStatus } from 'src/common/enums/genreStatus.enum';

export class CreateGenreDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  desc: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ enum: GenreStatus, default: GenreStatus.ACTIVE })
  status: GenreStatus;

  @ApiProperty({ enum: EmotionEnum })
  emotion: EmotionEnum;
}
export default CreateGenreDTO;
