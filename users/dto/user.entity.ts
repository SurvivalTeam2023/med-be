import { Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
class User {
  // ...

  public name: string;
  public email: string;
  @JoinColumn()
  public avatar?: string;
}

export default User;
