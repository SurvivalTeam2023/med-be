import {
    Column,
    Entity,
    ManyToOne,
    OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { PromptDetailEntity } from 'src/modules/promptDetail/entities/promptDetail.entity';
import { MentalHealthEntity } from 'src/modules/mentalHealth/entities/mentalHealth.entity';
import { PromptStatus } from 'src/common/enums/promptStatus.enum';

@Entity('prompt')
export class PromptEntity extends BaseEntity {
    @Column()
    public name: string;
    @Column({
        type: 'enum',
        enum: PromptStatus,
    })
    public status: PromptStatus;


    @OneToOne(
        () => PromptDetailEntity,
        (promptDetail) => promptDetail.prompt,
    )
    public promptDetail: PromptDetailEntity;
    @ManyToOne(
        () => MentalHealthEntity, (mentalHealth) => mentalHealth.prompt
    )
    public mentalHealth: MentalHealthEntity

}
