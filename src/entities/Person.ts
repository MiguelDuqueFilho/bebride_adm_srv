import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Event } from './Event';

export enum Gender {
  'Masculino' = 'Masculino',
  'Feminino' = 'Feminino',
  'Não Binário' = 'Não Binário',
}

@Entity('persons')
class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.Feminino,
  })
  gender: Gender;

  @Column({
    type: 'varchar',
    length: 16,
  })
  user_id: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User;

  @Column({
    type: 'varchar',
    length: 16,
  })
  event_id: string;

  @JoinColumn({ name: 'event_id' })
  @ManyToOne(() => Event)
  event: Event;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Person };
