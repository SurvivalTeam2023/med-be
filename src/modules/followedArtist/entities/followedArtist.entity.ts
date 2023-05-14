import { BaseEntity } from "src/common/base/base.entity";
import ArtistEntity from "src/modules/artist/entities/artist.entity";
import UserEntity from "src/modules/user/entities/user.entity";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity('followed_artist')
export class FollowedArtistEntity extends BaseEntity {

    @Column({ name: 'artist_id' })
    public artistId!: string;

    @Column({ name: 'user_id' })
    public userId!: string;

    @ManyToOne(() => UserEntity, (user) => user.followedArtist)
    @JoinColumn({ name: 'user_id' })
    public user: UserEntity;

    @ManyToOne(() => ArtistEntity, (artist) => artist.follower)
    @JoinColumn({ name: 'artist_id' })
    public artist: ArtistEntity;


}
