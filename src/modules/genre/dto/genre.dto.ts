import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { EmotionEnum } from 'src/common/enums/emotion.enum';
import { GenreStatus } from 'src/common/enums/genreStatus.enum';
import { PlaylistEntity } from 'src/modules/playlist/entities/playlist.entity';
import UserEntity from 'src/modules/user/entities/user.entity';
import { GenreEntity } from '../entities/genre.entity';

export class GenreDTO {

    genre: GenreEntity

    playlists: {
        playlist: PlaylistEntity;
        author: UserEntity;
    }[]
}
export default GenreDTO;
