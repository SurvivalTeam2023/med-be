import { AudioStatus } from '../../../common/enums/audioStatus.enum';
import { AudioPlaylistEntity } from 'src/modules/audioPlaylist/entities/audioPlaylist.entity';
import { AudioFileEntity } from 'src/modules/audioFile/entities/audioFile.entity';
import ArtistEntity from 'src/modules/artist/entities/artist.entity';

export class AudioDTO {
  id: number;
  name: string;
  imageUrl: string;
  status: AudioStatus;
  liked: number;
  audioPlaylist?: AudioPlaylistEntity[];
  audioFile: AudioFileEntity[];
  artist: ArtistEntity;
  isLiked: boolean
}
export default AudioDTO;
