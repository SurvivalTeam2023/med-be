import { Audio } from 'src/modules/audio/entities/audio.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public url: string;

  @Column()
  public key: string;

  @ManyToOne(() => Audio, (audio) => audio.files)
  audio: Audio
}
