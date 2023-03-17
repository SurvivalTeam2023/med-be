import { BaseEntity } from 'src/common/base/base.entity';
import { PlaylistEntity } from 'src/modules/playlist/entities/playlist.entity';
import UserEntity from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('follower')
export class FollowerEntity extends BaseEntity {
    @Column({ name: 'subscriber_id', nullable: true })
    public subscriberId!: string;

    @Column({ name: 'playlist_id' })
    public playlistId!: string;

    @ManyToOne(() => PlaylistEntity, (playlist) => playlist.follower,)
    @JoinColumn({ name: 'playlist_id' })
    public playlist: PlaylistEntity;

    @ManyToOne(() => UserEntity, (user) => user.follower, )
    @JoinColumn({ name: 'subscriber_id' })
    public user: UserEntity;
}