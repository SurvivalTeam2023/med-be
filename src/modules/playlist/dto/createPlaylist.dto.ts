/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PlaylistStatus } from '../../../common/enums/playlistStatus.enum';
import { PlaylistPublic } from 'src/common/enums/playlistPublic.enum';

export class CreatePlaylistDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;


  @ApiProperty({ enum: PlaylistPublic })
  isPublic: PlaylistPublic;

}
export default CreatePlaylistDto;
