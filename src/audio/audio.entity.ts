import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AudioStatus } from "./audioStatus.enum";


@Entity()
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

@Column()
public playlist_id:number

@CreateDateColumn({ type: 'timestamp' })
public created_at: Date;


@UpdateDateColumn({type:'timestamp'})
public last_update_at:Date;


public get getName() : string {
    return this.name
}

}




