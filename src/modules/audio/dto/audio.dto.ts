import { AudioStatus } from '../../../common/enums/audioStatus.enum';
import { AudioPlaylistEntity } from 'src/modules/audioPlaylist/entities/audioPlaylist.entity';
import { AudioFileEntity } from 'src/modules/audioFile/entities/audioFile.entity';

export class AudioDTO {
  id: number;
  name: string;
  imageUrl: string;
  status: AudioStatus;
  liked: number;
  audioPlaylist?: AudioPlaylistEntity[];
  audioFile: AudioFileEntity[];
  isLiked: boolean
}
export default AudioDTO;
