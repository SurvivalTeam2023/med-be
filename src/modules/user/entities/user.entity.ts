import { GENDER } from 'src/common/enums/userGender.enum';
import { USER_STATUS } from 'src/common/enums/userStatus.enum';
import { HistoryEntity } from 'src/modules/history/entities/history.entity';
import { QuestionBankEntity } from 'src/modules/questionBank/entities/questionBank.entity';
import { SubscriptionEntity } from 'src/modules/subscription/entities/subscription.entity';
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
import { UpdateDateColumn } from 'typeorm/decorator/columns/UpdateDateColumn';
import { FollowedArtistEntity } from 'src/modules/followedArtist/entities/followedArtist.entity';
import { GenreUserEntity } from 'src/modules/favoriteGenre/entities/genreUser.entity';
import { ResultEntity } from 'src/modules/result/entities/result.entity';
import { PlaylistUserEntity } from 'src/modules/follower/entities/playlist_user.entity';
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column({
    nullable: true,
    name: 'first_name',
  })
  firstName: string;

  @Column({
    nullable: true,
    name: 'last_name',
  })
  lastName: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({
    type: 'enum',
    enum: GENDER,
  })
  gender: GENDER;

  @Column({
    nullable: true,
  })
  city: string;

  @Column({
    nullable: true,
  })
  address: string;

  @Column({
    nullable: true,
  })
  dob: Date;

  @Column({
    type: 'enum',
    enum: USER_STATUS,
  })
  status: USER_STATUS;

  @JoinColumn()
  @OneToOne(() => FileEntity, {
    eager: true,
    nullable: true,
  })
  public avatar?: FileEntity;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  public created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'last_updated_at' })
  public lastUpdatedAt: Date;

  @OneToMany(() => QuestionBankEntity, (questionBank) => questionBank.user, {
    cascade: true,
  })
  questionBank: QuestionBankEntity[];

  @OneToMany(() => SubscriptionEntity, (subcription) => subcription.user, {
    cascade: true,
  })
  subscription: SubscriptionEntity[];

  @OneToMany(() => HistoryEntity, (history) => history.userId, {
    cascade: true,
  })
  history: HistoryEntity[];

  @OneToMany(() => GenreUserEntity, (favorite) => favorite.userId, {
    cascade: true,
  })
  favorite: GenreUserEntity[];

  @OneToMany(() => PlaylistUserEntity, (follower) => follower.user, {
    cascade: true,
  })
  follower: PlaylistUserEntity[];

  @OneToMany(
    () => FollowedArtistEntity,
    (followedArtist) => followedArtist.user,
    {
      cascade: true,
    },
  )
  followedArtist: FollowedArtistEntity[];

  @OneToMany(() => ResultEntity, (result) => result.user, {
    cascade: true,
  })
  result: ResultEntity[];

}
export default UserEntity;
