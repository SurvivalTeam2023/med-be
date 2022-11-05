import { Audio } from "src/audio/audio.entity";
import { Playlist } from "src/playlist/playlist.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('audio_playlist')
export class AudioPlaylist{

@PrimaryGeneratedColumn("increment")
public id?:number;

@ManyToOne((type) => Audio, (audio) => audio.audio_playlist)
@JoinColumn({ name: 'audio_id' })
public audio?:Audio;

@ManyToOne(() => Playlist, (playlist) => playlist.audio_playlist)
@JoinColumn({ name: 'playlist_id' })
public playlist:Playlist;

@CreateDateColumn({ type: 'timestamp' })
public created_at: Date;


}

export default AudioPlaylist




