import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  'visitante' = 'visitante',
  'cliente' = 'cliente',
  'parceiro' = 'parceiro',
  'administrador' = 'administrador',
  'suporte' = 'suporte',
}

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.visitante,
  })
  role: UserRole;

  @Column()
  provider: string;

  @Column()
  image: string;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;
}

export { User };
