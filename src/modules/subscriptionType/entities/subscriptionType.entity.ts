/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { SubscriptionEntity } from 'src/modules/subscription/entities/subscription.entity';
import { SubscriptionTypeStatus } from 'src/common/enums/subscriptionTypeStatus.enum';

@Entity('subcription_type')
export class SubscriptionTypeEntity extends BaseEntity {
  @Column()
  public name: string;

  @Column()
  public desc: string;

  @Column()
  public usageTime: number;

  @Column()
  public cost: number;

  @Column({
    type: 'enum',
    enum: SubscriptionTypeStatus
  })
  public status: SubscriptionTypeStatus;

  @OneToMany(
    () => SubscriptionEntity,
    (subscription) => subscription.subscriptionType,
  )
  public subscription: SubscriptionEntity[];
}
