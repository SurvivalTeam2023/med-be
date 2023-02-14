import { BaseEntity } from 'src/common/base/base.entity';
import ArtistEntity from 'src/modules/artist/entities/artist.entity';
import { PlaylistEntity } from 'src/modules/playlist/entities/playlist.entity';
import UserEntity from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('follower')
export class FollowerEntity extends BaseEntity {
    @Column({ name: 'user_id' })
    public userId!: number;

    @Column({ name: 'artist_id' })
    public artistId!: number;

    @Column({ name: 'playlist_id' })
    public playlistId!: number;

    @ManyToOne(() => UserEntity, (user) => user.follower)
    @JoinColumn({ name: "user_id" })
    public user: UserEntity;

    @ManyToOne(() => ArtistEntity, (question) => question.follower)
    @JoinColumn({ name: "artist_id" })
    public artist: ArtistEntity;

    @ManyToOne(() => PlaylistEntity, (playlist) => playlist.follower)
    @JoinColumn({ name: "playlist_id" })
    public playlist: PlaylistEntity;
}