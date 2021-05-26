import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Index,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { Profile } from './Profile';

export enum UserRole {
  'visitante' = 'visitante',
  'cliente' = 'cliente',
  'parceiro' = 'parceiro',
  'administrador' = 'administrador',
  'suporte' = 'suporte',
}

@Entity('users')
@Index('IDX_EMAIL_UNIQUE', ['email'], { unique: true })
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.visitante,
  })
  role: UserRole;

  @Column({ select: false })
  profile_id: string;

  @OneToOne(() => Profile)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @Column({ select: false })
  provider: string;

  @Column({ select: false })
  password_salt: string;

  @Column({ select: false })
  password_hash: string;

  @Column({ select: false })
  email_verified: Date;

  @Column({ select: false })
  deleted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

export { User };
