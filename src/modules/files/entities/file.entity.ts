/* eslint-disable prettier/prettier */
import { AudioEntity } from 'src/modules/audio/entities/audio.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('file')
export class FileEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public url: string;

  @Column()
  public key: string;

  @ManyToOne(() => AudioEntity, (audio) => audio.files)
  audio: AudioEntity;
}
