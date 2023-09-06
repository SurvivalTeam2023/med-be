import {
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { QuestionStatus } from 'src/common/enums/questionStatus.enum';
import { PromptEntity } from 'src/modules/prompt/entities/prompt.entity';

@Entity('prompt')
export class PromptDetailEntity extends BaseEntity {
  @Column()
  public detail: string;
  @Column({
    type: 'enum',
    enum: QuestionStatus,
  })
  public status: QuestionStatus;


  @ManyToOne(() => PromptEntity, (prompt) => prompt.promptDetail, {
    cascade: true,
  })
  prompt: PromptEntity;
}
