import AudioPlaylist from "src/audioPlaylist/entities/audioPlaylist.entity";
import { Playlist } from "src/playlist/entities/playlist.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AudioStatus } from "../enum/audioStatus.enum";


@Entity('audio')
export class Audio extends BaseEntity{

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

}




