import { Entity, JoinColumn, OneToOne } from 'typeorm';
import PublicFile from '../files/publicFile.entity';

@Entity()
class User {
  // ...

  @JoinColumn()
  @OneToOne(() => PublicFile, {
    eager: true,
    nullable: true,
  })
  public avatar?: PublicFile;
}

export default User;
