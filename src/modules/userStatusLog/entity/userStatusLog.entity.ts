import { BaseEntity } from "src/common/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity('user_status_log')
export class UserStatusLogEntity extends BaseEntity {
    @Column()
    public month: number;
 
    @Column()
    public isActive: number;
 
    @Column()
    public isInactive: number;

}