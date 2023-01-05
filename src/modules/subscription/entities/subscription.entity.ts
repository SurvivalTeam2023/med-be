import { BaseEntity } from 'src/common/base/base.entity';
import { SubscriptionStatus } from 'src/common/enums/subscriptionStatus.enum';
import { AccessEntity } from 'src/modules/access/entities/access.entity';
import { SubscriptionTypeEntity } from 'src/modules/subscriptionType/entities/subscriptionType.entity';
import UserEntity from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('subscription')
export class SubscriptionEntity extends BaseEntity {
    @ManyToOne(() => UserEntity, (user) => user.subcription)
    @JoinColumn({ name: "user_id" })
    public userId: UserEntity;

    @Column({
        type: 'enum',
        enum: SubscriptionStatus
    })
    public status: SubscriptionStatus;

    @ManyToOne(() => SubscriptionTypeEntity, (subscriptionType) => subscriptionType.subscription)
    @JoinColumn({ name: "subscription_type_id" })
    public subscriptionTypeId: SubscriptionTypeEntity;

    @Column({ name: "start_date", type: 'timestamp' })
    startDate: Date

    @Column({ name: "end_date", type: 'timestamp' })
    endDate: Date

    @OneToMany(() => AccessEntity, (access) => access.subscriptionId, { cascade: true })
    access: AccessEntity[];

}
