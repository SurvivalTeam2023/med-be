import { BaseEntity } from "src/modules/audio/entities/base.entity";
import AudioPlaylist from "src/modules/audioPlaylist/entities/audioPlaylist.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PlaylistStatus } from "../enum/playlistStatus.enum";

@Entity('playlist')
export class Playlist extends BaseEntity {
    @Column()
    public name: string;

    @Column()
    public image_url: string;

    @Column()
    public status: PlaylistStatus;

    @Column()
    public description: string;

    @Column()
    public user_id?: number

    @OneToMany(() => AudioPlaylist, audio_playlist => audio_playlist.playlist)
    audio_playlist: AudioPlaylist[];

}




