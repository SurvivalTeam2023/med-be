import { SubscriptionStatus } from 'src/common/enums/subscriptionStatus.enum';
import { PlanEntity } from 'src/modules/plan/entities/plan.entity';
import UserEntity from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('subscription')
export class SubscriptionEntity {
  @PrimaryColumn()
  public id: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'last_updated_at' })
  public lastUpdatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.subscription)
  @JoinColumn({ name: 'user_id' })
  public user: UserEntity;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
  })
  public status: SubscriptionStatus;

  @ManyToOne(() => PlanEntity, (plan) => plan.subscription)
  @JoinColumn({ name: 'plan_id' })
  public plan: PlanEntity;

  @Column({ name: 'end_date', type: 'timestamp' })
  endDate: Date;


}
