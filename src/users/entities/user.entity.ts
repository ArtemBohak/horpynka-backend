import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Unique(['username'])
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'character varying', length: 255, unique: true })
  email: string;

  @Column({ type: 'character varying', length: 100 })
  username: string;

  @Column({ type: 'character varying', length: 255 })
  password: string;

  @Column({ type: 'text', array: true, default: [] })
  roles: string[];
}
