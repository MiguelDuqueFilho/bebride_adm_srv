import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { User } from './User';

@Entity('messages')
class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 16,
  })
  admin_id: string;

  @Column()
  text: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User;

  @Index('FK_MessagesUser', { unique: true })
  @Column({
    type: 'varchar',
    length: 16,
  })
  user_id: string;

  @CreateDateColumn()
  created_at: Date;
}

export { Message };
