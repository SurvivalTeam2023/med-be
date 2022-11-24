import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @CreateDateColumn({ type: 'timestamp' })
  public created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public last_updated_at: Date;
}
