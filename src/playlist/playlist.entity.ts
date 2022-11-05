import AudioPlaylist from "src/audioPlaylist/audioPlaylist.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PlaylistStatus } from "./playlistStatus.enum";


@Entity('playlist')
export class Playlist{

@PrimaryGeneratedColumn("increment")
public id:number;

@Column()
public name:string;

@Column()
public image_url:string;

@Column()
public playlist_status:PlaylistStatus;

@Column()
public description:string;

@Column()
public user_id?:number

@OneToMany(() => AudioPlaylist, audio_playlist => audio_playlist.playlist)
@JoinColumn({ referencedColumnName: 'playlistId' })
audio_playlist:AudioPlaylist[];

@CreateDateColumn({ type: 'timestamp' })
public created_at: Date;


@UpdateDateColumn({type:'timestamp'})
public last_updated_at:Date;

}




