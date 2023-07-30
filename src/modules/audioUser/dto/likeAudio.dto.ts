import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
import { AudioStatus } from '../../../common/enums/audioStatus.enum';

export class LikedAudioDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    audioId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isLiked: boolean;
}
export default LikedAudioDTO;
