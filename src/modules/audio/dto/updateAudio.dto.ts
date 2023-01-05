import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AudioStatus } from '../../../common/enums/audioStatus.enum';

export class UpdateAudioDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @ApiProperty({ enum: AudioStatus, default: AudioStatus.ACTIVE })
  status: AudioStatus;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  length: string;
}
export default UpdateAudioDTO;
