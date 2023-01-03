import { BaseEntity } from 'src/common/base/base.entity';
import { AccessEntity } from 'src/modules/access/entities/access.entity';
import { SubcriptionTypeEntity } from 'src/modules/subcriptionType/entities/subcriptionType.entity';
import UserEntity from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('subcription')
export class SubcriptionEntity extends BaseEntity {
    @ManyToOne(() => UserEntity, (user) => user.subcription)
    @JoinColumn({ name: "user_id" })
    public userId: UserEntity;

    @ManyToOne(() => SubcriptionTypeEntity, (subcriptionType) => subcriptionType.subcription)
    @JoinColumn({ name: "subscription_type_id" })
    public subcriptionTypeId: SubcriptionTypeEntity;

    @Column({ name: "start_date", type: 'timestamp' })
    startDate: Date

    @Column({ name: "end_date", type: 'timestamp' })
    endDate: Date

    @OneToMany(() => AccessEntity, (access) => access.subcriptionId, { cascade: true })
    access: AccessEntity[];

}
