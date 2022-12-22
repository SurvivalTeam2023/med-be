import { BaseEntity } from 'src/common/base/base.entity';
import ArtistEntity from 'src/modules/artist/entities/artist.entity';
import { PlaylistEntity } from 'src/modules/playlist/entities/playlist.entity';
import UserEntity from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('follower')
export class FollowerEntity extends BaseEntity {
    @Column()
    point: number

    @ManyToOne(() => UserEntity, (user) => user.follower)
    @JoinColumn({ name: "user_id" })
    public userId: UserEntity;

    @ManyToOne(() => ArtistEntity, (question) => question.follower)
    @JoinColumn({ name: "artist_id" })
    public artistId: ArtistEntity;

    @ManyToOne(() => PlaylistEntity, (playlist) => playlist.follower)
    @JoinColumn({ name: "playlist_id" })
    public playlistId: PlaylistEntity;
}
