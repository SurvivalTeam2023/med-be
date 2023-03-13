/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PlaylistStatus } from '../../../common/enums/playlistStatus.enum';

export class SearchPlaylistDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ enum: PlaylistStatus, required: false })
  status: PlaylistStatus;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  authorId: string;
}
export default SearchPlaylistDto;
