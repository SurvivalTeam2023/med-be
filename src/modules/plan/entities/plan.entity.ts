/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { SubscriptionEntity } from 'src/modules/subscription/entities/subscription.entity';
import { PlanStatus } from 'src/common/enums/planStatus.enum';


@Entity('plan')
export class PlanEntity {
  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public desc: string;

  @Column({ name: "usage_time" })
  public usageTime: number;

  @Column()
  public cost: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'last_updated_at' })
  public lastUpdatedAt: Date;

  @Column({
    type: 'enum',
    enum: PlanStatus
  })
  public status: PlanStatus;

  @OneToMany(
    () => SubscriptionEntity,
    (subscription) => subscription.plan,
  )
  public subscription: SubscriptionEntity[];
}
