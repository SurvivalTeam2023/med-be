import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { EmotionEnum } from 'src/common/enums/emotion.enum';
import { GenreStatus } from 'src/common/enums/genreStatus.enum';
import { PlaylistEntity } from 'src/modules/playlist/entities/playlist.entity';

export class GenreDTO {

    id: number

    name: string;

    emotion: EmotionEnum;

    playlists: {
        playlist: PlaylistEntity;
        author: string;
    }[]
}
export default GenreDTO;
