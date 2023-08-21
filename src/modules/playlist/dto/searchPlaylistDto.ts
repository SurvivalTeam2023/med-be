import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import { PlaylistStatus } from '../../../common/enums/playlistStatus.enum';
import { PlaylistType } from 'src/common/enums/playlistType.enum';

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

  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  genreId: number;

  @ApiProperty({ enum: PlaylistType, required: false, })
  playListType: PlaylistType;

  @ApiProperty({ required: false, default: 1 })
  @IsNumberString()
  @IsOptional()
  page: number;

  @ApiProperty({ required: false, default: 10 })
  @IsNumberString()
  @IsOptional()
  limit: number;
}
export default SearchPlaylistDto;
