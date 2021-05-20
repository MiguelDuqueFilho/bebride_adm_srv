import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity('messages')
class Message {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  admin_id: number;

  @Column()
  text: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User;

  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;
}

export { Message };
