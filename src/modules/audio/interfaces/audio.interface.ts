/* eslint-disable prettier/prettier */
import { AudioStatus } from '../../../common/enums/audioStatus.enum';

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
