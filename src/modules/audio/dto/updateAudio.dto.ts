import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AudioStatus } from '../../../common/enums/audioStatus.enum';

export class UpdateAudioDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  imageUrl: string;

  @ApiProperty({ enum: AudioStatus, default: AudioStatus.ACTIVE })
  status: AudioStatus;

  @IsOptional()
  @IsString()
  @ApiProperty()
  length: string;
}
export default UpdateAudioDTO;
