import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { User } from './User';
import { Event } from './Event';

export enum Gender {
  'Feminino' = 'Feminino',
  'Masculino' = 'Masculino',
  'Não Binário' = 'Não Binário',
}

@Entity('profiles')
class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.Feminino,
  })
  gender: Gender;

  @Column()
  photo: string;

  // @Column({
  //   type: 'varchar',
  //   length: 36,
  // })
  // event_id: string;

  // @JoinColumn({ name: 'event_id' })
  // @ManyToOne(() => Event)
  // event: Event;

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;
}

export { Profile };
