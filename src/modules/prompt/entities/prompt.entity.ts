import {
    Column,
    Entity,
    ManyToOne,
    OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { QuestionStatus } from 'src/common/enums/questionStatus.enum';
import { PromptDetailEntity } from 'src/modules/promptDetail/entities/promptDetail.entity';
import { MentalHealthEntity } from 'src/modules/mentalHealth/entities/mentalHealth.entity';

@Entity('prompt')
export class PromptEntity extends BaseEntity {
    @Column()
    public name: string;
    @Column({
        type: 'enum',
        enum: QuestionStatus,
    })
    public status: QuestionStatus;


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
