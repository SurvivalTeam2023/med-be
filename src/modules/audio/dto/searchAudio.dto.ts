import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import { AudioStatus } from '../../../common/enums/audioStatus.enum';

export class SearchAudioDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    enum: AudioStatus,
    required: false,
    default: AudioStatus.ACTIVE,
  })
  @IsOptional()
  status: AudioStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  playlistId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  artistId: string;
}
export default SearchAudioDTO;
