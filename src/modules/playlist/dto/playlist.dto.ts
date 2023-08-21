import { PlaylistPublic } from "src/common/enums/playlistPublic.enum";
import { PlaylistStatus } from "src/common/enums/playlistStatus.enum";
import { PlaylistType } from "src/common/enums/playlistType.enum";
import AudioDTO from "src/modules/audio/dto/audio.dto";


export class PlaylistDTO {

  public name: string;

  public authorId!: string;

  public imageUrl?: string;

  public status: PlaylistStatus;

  public description: string;

  public isPublic: PlaylistPublic;
  public author: {
    firstName: string,
    lastName: string
  }

  public audioPlaylist: { id: number, audio: AudioDTO }[];


  public playlistType: PlaylistType;
}
export default PlaylistDTO;
