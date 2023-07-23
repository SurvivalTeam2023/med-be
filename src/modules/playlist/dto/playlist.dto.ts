import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PlaylistStatus } from '../../../common/enums/playlistStatus.enum';

export class PlaylistDto {

  id: number;


  name: string;

  author: string
}
export default PlaylistDto;
