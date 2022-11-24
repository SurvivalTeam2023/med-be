import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PlaylistStatus } from '../enum/playlistStatus.enum';

export class PlaylistDto {
  @ApiProperty()
  @IsOptional()
  id: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ enum: PlaylistStatus })
  @IsOptional()
  status: PlaylistStatus;
}
export default PlaylistDto;
