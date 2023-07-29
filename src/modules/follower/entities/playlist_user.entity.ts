import { BaseEntity } from 'src/common/base/base.entity';
import { PlaylistEntity } from 'src/modules/playlist/entities/playlist.entity';
import UserEntity from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('playlist_user')
export class PlaylistUserEntity extends BaseEntity {
    @Column({ name: 'user_id', nullable: true })
    public userId!: string;

    @Column({ name: 'playlist_id' })
    public playlistId!: string;

    @ManyToOne(() => PlaylistEntity, (playlist) => playlist.follower,)
    @JoinColumn({ name: 'playlist_id' })
    public playlist: PlaylistEntity;

    @ManyToOne(() => UserEntity, (user) => user.follower, )
    @JoinColumn({ name: 'user_id' })
    public user: UserEntity;
}