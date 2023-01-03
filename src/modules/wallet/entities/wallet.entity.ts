import { Column, Entity, ManyToOne, } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { WalletStatus } from 'src/common/enums/walletStatus.enum';
import ArtistEntity from 'src/modules/artist/entities/artist.entity';

@Entity('wallet')
export class WalletEntity extends BaseEntity {
  @Column({name:"bank_name"})
  public bankName: string;

  @Column({name:"bank_account_number"})
  public bankAccountNumber: string;

  @Column({name:"bank_account_owner"})
  public bankAccountOwner: string;

  @Column({
    type: 'enum',
    enum: WalletStatus
  })
  public status: WalletStatus;

  @ManyToOne(() => ArtistEntity, (artist) => artist.wallet)
  public artist: ArtistEntity;
}
