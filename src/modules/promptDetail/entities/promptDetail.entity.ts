import {
  Column,
  Entity,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../../common/base/base.entity';
import { PromptEntity } from 'src/modules/prompt/entities/prompt.entity';
import { PromptStatus } from 'src/common/enums/promptStatus.enum';

@Entity('prompt_detail')
export class PromptDetailEntity extends BaseEntity {
  @Column()
  public detail: string;
  @Column({
    type: 'enum',
    enum: PromptStatus,
  })
  public status: PromptStatus;


  @OneToOne(() => PromptEntity, (prompt) => prompt.promptDetail, {
    cascade: true,
  })
  prompt: PromptEntity;
}
