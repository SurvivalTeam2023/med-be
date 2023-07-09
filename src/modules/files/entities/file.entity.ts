import { AudioEntity } from 'src/modules/audio/entities/audio.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('file')
export class FileEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public url: string;

  @Column()
  public key: string;

  @OneToOne(() => AudioEntity, (audio) => audio.file)
  audio: AudioEntity;
}
