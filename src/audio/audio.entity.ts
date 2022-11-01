import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AudioStatus } from "./audioStatus.enum";


@Entity()
export class Audio{
@PrimaryGeneratedColumn("increment")
 private id:number;

@Column()
private name:string;

@Column()
private image_url:string;

@Column()
private audio_status:AudioStatus;

@Column()
private length:string;

@Column()
private playlist_id:number

@CreateDateColumn({ type: 'timestamp' })
private created_at: Date;


@UpdateDateColumn({type:'timestamp'})
private last_update_at:Date;


}
