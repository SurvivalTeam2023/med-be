import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AudioStatus } from '../../../common/enums/audioStatus.enum';

export class CreateAudioDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image_url: string;

  @ApiProperty({ enum: AudioStatus, default: AudioStatus.ACTIVE })
  status: AudioStatus;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  length: string;

  @ApiProperty({ type: [Number] })
  @IsOptional()
  @IsArray()
  playlist_id?: number[];
}
export default CreateAudioDTO;
