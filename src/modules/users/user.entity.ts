import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FileDTO } from '../files/dto/file.dto';
import { IUser } from './interface/user.interface';

@Entity({ name: 'users' })
class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isActive: boolean;

  @JoinColumn()
  @OneToOne(() => FileDTO, {
    eager: true,
    nullable: true,
  })
  public avatar?: FileDTO;
}

export default User;
