import { GENDER } from 'src/common/enums/user-gender.enum';
import { USER_STATUS } from 'src/common/enums/user-status.enum';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
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

  @Column({
    nullable: true
  })
  firstName: string;

  @Column({
    nullable: true
  })
  lastName: string;

  @Column({
    nullable: true
  })
  gender: GENDER;  

  @Column({
    nullable: true
  })
  city: string;

  @Column({
    nullable: true
  }
  )
  address: string;

  @Column({
    nullable: true
  })
  dob: Date;

  @Column({
    type: 'enum',
    enum: USER_STATUS
  })
  status: USER_STATUS;

  @JoinColumn()
  @OneToOne(() => File, {
    eager: true,
    nullable: true,
  })
   public avatar?: File;

  @CreateDateColumn({ type: 'timestamp' })
  public created_at: Date;
}

export default User;
