import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
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
  playlist_id: number;
}
export default SearchAudioDTO;
