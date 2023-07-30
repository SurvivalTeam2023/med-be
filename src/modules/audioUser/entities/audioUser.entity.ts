import { BaseEntity } from 'src/common/base/base.entity';
import { AudioEntity } from 'src/modules/audio/entities/audio.entity';
import { GenreEntity } from 'src/modules/genre/entities/genre.entity';
import UserEntity from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('audio_user')
export class AudioUserEntity extends BaseEntity {

  @Column({ name: 'audio_id' })
  public audioId?: number;

  @Column({ name: 'user_id' })
  public userId?: string;

  @ManyToOne(() => AudioEntity, (audio) => audio.audioUser)
  @JoinColumn({ name: 'genre_id' })
  public audio: AudioEntity;

  @ManyToOne(() => UserEntity, (user) => user.audioUser)
  @JoinColumn({ name: 'user_id' })
  public user: UserEntity;
}
