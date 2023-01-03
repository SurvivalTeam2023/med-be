import { Column, Entity, OneToMany, } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { SubcriptionEntity } from 'src/modules/subcription/entities/subcription.entity';

@Entity('subcription_type')
export class SubcriptionTypeEntity extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public desc: string;

  @OneToMany(() => SubcriptionEntity, (subcription) => subcription.subcriptionTypeId, {
    cascade: true,
  })
  public subcription: SubcriptionEntity[];
}

