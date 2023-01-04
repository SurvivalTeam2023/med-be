import { USER_STATUS } from 'src/common/enums/user-status.enum';
import { AudioEntity } from 'src/modules/audio/entities/audio.entity';
import { FollowerEntity } from 'src/modules/follower/entities/follower.entity';
import { WalletEntity } from 'src/modules/wallet/entities/wallet.entity';
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
@Entity({ name: 'artist' })
export class ArtistEntity {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => AudioEntity, (audio) => audio.artist)
  audios: AudioEntity[];

  @Column()
  username: string;

  @Column()
  bio: string;

  @Column()
  artist_name: string;

  @Column()
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

  @OneToMany(() => WalletEntity, (wallet) => wallet.artist, {
    cascade: true,
  })
  public wallet: WalletEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  public created_at: Date;

  @OneToMany(() => FollowerEntity, (follower) => follower.artistId, {
    cascade: true,
  })
  follower: FollowerEntity[];
}

export default ArtistEntity;
