import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity('messages')
class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'binary',
    length: 16,
  })
  admin_id: string;

  @Column()
  text: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User;

  @Column({
    type: 'binary',
    length: 16,
  })
  user_id: string;

  @CreateDateColumn()
  created_at: Date;
}

export { Message };
