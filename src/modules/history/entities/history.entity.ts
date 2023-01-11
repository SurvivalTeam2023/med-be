/* eslint-disable prettier/prettier */
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import UserEntity from 'src/modules/user/entities/user.entity';
import { AudioEntity } from 'src/modules/audio/entities/audio.entity';

@Entity('history')
export class HistoryEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.history)
  @JoinColumn({ name: 'user_id' })
  public userId: UserEntity;

  @ManyToOne(() => AudioEntity, (audio) => audio.history)
  @JoinColumn({ name: 'audio_id' })
  public audioId: AudioEntity;
}
