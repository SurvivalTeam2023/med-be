import { AudioStatus } from '../enum/audioStatus.enum';

export interface AudioInterface {
  id: number;
  name: string;
  image_url: string;
  audio_status: AudioStatus;
  length: string;
  playlist_id?: number;
  created_at?: Date;
  last_updated_at?: Date;
}
