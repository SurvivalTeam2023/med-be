import {
    Column,
    Entity,
    OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { QuestionStatus } from 'src/common/enums/questionStatus.enum';
import { PromptDetailEntity } from 'src/modules/promptDetail/entities/promptDetail.entity';

@Entity('prompt')
export class PromptEntity extends BaseEntity {
    @Column()
    public name: string;
    @Column({
        type: 'enum',
        enum: QuestionStatus,
    })
    public status: QuestionStatus;


    @OneToMany(
        () => PromptDetailEntity,
        (promptDetail) => promptDetail.prompt,
    )
    public promptDetail: PromptDetailEntity[];
}
