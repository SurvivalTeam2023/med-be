import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { AudioStatus } from '../../../common/enums/audioStatus.enum';

export class SearchLikedAudioDTO {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name: string;
}
export default SearchLikedAudioDTO;
