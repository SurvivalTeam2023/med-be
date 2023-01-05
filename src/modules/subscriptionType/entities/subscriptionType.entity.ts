import { Column, Entity, OneToMany, } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { SubscriptionEntity } from 'src/modules/subscription/entities/subscription.entity';

@Entity('subcription_type')
export class SubscriptionTypeEntity extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public desc: string;

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.subscriptionTypeId, {
    cascade: true,
  })
  public subscription: SubscriptionEntity[];
}

