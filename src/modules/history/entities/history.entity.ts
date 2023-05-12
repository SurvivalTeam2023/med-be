/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import UserEntity from 'src/modules/user/entities/user.entity';
import { AudioEntity } from 'src/modules/audio/entities/audio.entity';

@Entity('history')
export class HistoryEntity extends BaseEntity {

  @Column({ name: 'audio_id' })
  public audioId!: number;

  @Column({ name: 'user_id' })
  public userId!: string;

  @ManyToOne(() => UserEntity, (user) => user.history)
  @JoinColumn({ name: 'user_id' })
  public user: UserEntity;

  @ManyToOne(() => AudioEntity, (audio) => audio.history)
  @JoinColumn({ name: 'audio_id' })
  public audio: AudioEntity;

  @Column({ default: 1 })
  public count: number
}
