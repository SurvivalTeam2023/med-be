import { BaseEntity } from 'src/common/base/base.entity';
import { MentalHealthLogEntity } from 'src/modules/mentalHealthLog/entities/mentalHealthLog.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('mental_health_degree_log')
export class MentalHealthDegreeLogEntity extends BaseEntity {

    @Column({ name: "mental_health_degree_id", nullable: true })
    public mentalHealthDegreeId: number;

    @Column({ name: "mental_health_id" })
    public mentalHealthId: number;


    @Column({ name: "user_id" })
    public userId: string;

    @ManyToOne(() => MentalHealthLogEntity, (mentalHealthLog) => mentalHealthLog.mentalHealthDegreeLog, {
        cascade: true,
    })
    mentalHealthLog: MentalHealthLogEntity;
}
