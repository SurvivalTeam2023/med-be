import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import PublicFile from 'src/modules/files/publicFile.entity';
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
  public avatar: string;
}

export default User;
