import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FileDTO {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public url: string;

  @Column()
  public key: string;
}
