import { AudioPlaylistEntity } from 'src/modules/audioPlaylist/entities/audioPlaylist.entity';
import { AudioStatus } from '../../../common/enums/audioStatus.enum';
import { AudioFileEntity } from 'src/modules/audioFile/entities/audioFile.entity';

export interface AudioInterface {
  id: number;
  name: string;
  imageUrl: string;
  status: AudioStatus;
  length: number;
  liked: number;
  isLiked: boolean
  audioFile: AudioFileEntity[];
  audioPlaylist: AudioPlaylistEntity[];
}
