import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PlaylistStatus } from '../enum/playlistStatus.enum';

export class CreatePlaylistDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image_url: string;

  @ApiProperty({ enum: PlaylistStatus })
  @IsEnum(PlaylistStatus)
  status: PlaylistStatus;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsNumber()
  user_id: number;
}
export default CreatePlaylistDto;
