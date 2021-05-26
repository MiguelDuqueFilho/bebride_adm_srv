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

export enum Gender {
  'Masculino' = 'Masculino',
  'Feminino' = 'Feminino',
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

  @OneToOne(() => User, (user) => user.profile_id) // specify inverse side as a second parameter
  user: User;

  //   @Column({
  //     type: 'varchar',
  //     length: 16,
  //   })
  //   event_id: string;

  //   @JoinColumn({ name: 'event_id' })
  //   @ManyToOne(() => Event)
  //   event: Event;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Profile };
