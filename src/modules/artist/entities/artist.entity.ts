import { USER_STATUS } from 'src/common/enums/user-status.enum';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { File } from '../../files/entities/file.entity';
  @Entity({ name: 'users' })
  export class Artist extends BaseEntity {
    @PrimaryColumn()  
    id: string;
    
    @Column()
    audio_id: string;
    
    @Column()
    username: string;
  
    @Column()
    bio: string;
  
    @Column()
    artist_name: string;

    @Column()
    dob: Date;
  
    @Column({
      type: 'enum',
      enum: USER_STATUS
    })
    status: USER_STATUS;
  
    @JoinColumn()
    @OneToOne(() => File, {
      eager: true,
      nullable: true,
    })
    public avatar?: File;
    
    @CreateDateColumn({ type: 'timestamp' })
    public created_at: Date;
  }
  
  export default Artist;