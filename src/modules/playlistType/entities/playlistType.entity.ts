/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { PlaylistEntity } from 'src/modules/playlist/entities/playlist.entity';

@Entity('playlist_type')
export class PlaylistTypeEntity extends BaseEntity {
  @Column()
  public name: string;

  @OneToMany(() => PlaylistEntity, (playlist) => playlist.playlistType, {
    cascade: true,
  })
  public playlist: PlaylistEntity[];
}
