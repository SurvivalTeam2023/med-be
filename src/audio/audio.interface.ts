import { AudioStatus } from "./audioStatus.enum";

export interface Audio{
    id:number;
    name:string;
    image_url:string;
    audio_status:AudioStatus;
    length:string;
    playlist_id:number;
    created_at:Date;
    last_updated_at:Date;
    
}