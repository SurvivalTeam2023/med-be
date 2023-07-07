/* eslint-disable prettier/prettier */
import { AudioEntity } from 'src/modules/audio/entities/audio.entity';
import { AudioFileEntity } from 'src/modules/audioFile/entities/audioFile.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('file')
export class FileEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public url: string;

  @Column()
  public key: string;

  @OneToMany(() => AudioFileEntity, (audioFile) => audioFile.file, { cascade: true })
  audioFile: AudioFileEntity[];
}
