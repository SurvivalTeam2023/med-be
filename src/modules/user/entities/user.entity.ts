import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { File } from '../../files/entities/file.entity';
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryColumn()  
  id: string;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  dob: Date;

  @Column()
  isActive: boolean;

  @JoinColumn()
  @OneToOne(() => File, {
    eager: true,
    nullable: true,
  })
  public avatar?: File;
}

export default User;
