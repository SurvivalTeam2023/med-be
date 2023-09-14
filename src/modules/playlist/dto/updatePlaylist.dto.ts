import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PlaylistStatus } from '../../../common/enums/playlistStatus.enum';

export class UpdatePlaylistDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  image_url: string;

  @ApiProperty({ enum: PlaylistStatus })
  @IsOptional()
  @IsEnum(PlaylistStatus)
  status: PlaylistStatus;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @IsOptional()
  description: string;


  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @IsOptional()
  isDefault: boolean;
}
export default UpdatePlaylistDto;
