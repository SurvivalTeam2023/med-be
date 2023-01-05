import { GENDER } from 'src/common/enums/user-gender.enum';
import { USER_STATUS } from 'src/common/enums/user-status.enum';
import { FollowerEntity } from 'src/modules/follower/entities/follower.entity';
import { HistoryEntity } from 'src/modules/history/entities/history.entity';
import { QuestionBankEntity } from 'src/modules/questionBank/entities/questionBank.entity';
import { SubcriptionEntity } from 'src/modules/subcription/entities/subcription.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { FileEntity } from '../../files/entities/file.entity';
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column({
    nullable: true,
    name:"first_name"
  })
  firstName: string;

  @Column({
    nullable: true,
    name:"last_name"
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
  @OneToOne(() => FileEntity, {
    eager: true,
    nullable: true,
  })
  public avatar?: FileEntity;

  @CreateDateColumn({ type: 'timestamp' })
  public created_at: Date;

  @OneToMany(() => QuestionBankEntity, (questionBank) => questionBank.userId, {
    cascade: true,
  })
  questionBank: QuestionBankEntity[];

  @OneToMany(() => FollowerEntity, (follower) => follower.userId, {
    cascade: true,
  })
  follower: FollowerEntity[];

  @OneToMany(() => SubcriptionEntity, (subcription) => subcription.userId, {
    cascade: true,
  })
  subcription: SubcriptionEntity[];

  @OneToMany(() => HistoryEntity, (history) => history.userId, {
    cascade: true,
  })
  history: HistoryEntity[];
}
export default UserEntity;
