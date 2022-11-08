import AudioPlaylist from "src/audioPlaylist/audioPlaylist.entity";
import { Playlist } from "src/playlist/playlist.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AudioStatus } from "./audioStatus.enum";


@Entity('audio')
export class Audio{

@PrimaryGeneratedColumn("increment")
public id:number;

@Column()
public name:string;

@Column()
public image_url:string;

@Column()
public audio_status:AudioStatus;

@Column()
public length:string;

@OneToMany(() => AudioPlaylist, audio_playlist => audio_playlist.audio,{
    cascade: true
})
@JoinColumn({ referencedColumnName: 'audioId' })
public audio_playlist:AudioPlaylist[];

@CreateDateColumn({ type: 'timestamp' })
public created_at: Date;


@UpdateDateColumn({type:'timestamp'})
public last_updated_at:Date;

}




