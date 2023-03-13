import { BaseEntity } from 'src/common/base/base.entity';
import ArtistEntity from 'src/modules/artist/entities/artist.entity';
import { PlaylistEntity } from 'src/modules/playlist/entities/playlist.entity';
import UserEntity from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('follower')
export class FollowerEntity extends BaseEntity {
    @Column({ name: 'subscriber_id' })
    public subscriberId!: string;

    @Column({ name: 'author_id' })
    public authorId!: string;

    @Column({ name: 'playlist_id' })
    public playlistId!: number;

    @OneToMany(() => PlaylistEntity, (playlist) => playlist.follower)
    @JoinColumn({ name: "playlist_id" })
    public playlist: PlaylistEntity[];
}