import { Column, Entity, JoinColumn, ManyToOne, } from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { AudioEntity } from 'src/modules/audio/entities/audio.entity';
import { SubscriptionEntity } from 'src/modules/subscription/entities/subscription.entity';

@Entity('access')
export class AccessEntity extends BaseEntity {
    @Column({ name: 'audio_id' })
    public audioId!: number;

    @Column({ name: 'subscription_id' })
    public subscriptionId!: number;


    @ManyToOne(() => SubscriptionEntity, (subscription) => subscription.access)
    @JoinColumn({ name: "subscription_id" })
    public subscription: SubscriptionEntity;


    @ManyToOne(() => AudioEntity, (audio) => audio.access)
    @JoinColumn({ name: 'audio_id' })
    public audio: AudioEntity;
}
