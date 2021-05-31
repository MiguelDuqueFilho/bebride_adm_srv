import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Index,
  JoinColumn,
  OneToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import { Profile } from './Profile';

import dotenv from 'dotenv';
dotenv.config();

enum UserRole {
  'visitante' = 'visitante',
  'cliente' = 'cliente',
  'parceiro' = 'parceiro',
  'administrador' = 'administrador',
  'suporte' = 'suporte',
}

enum UserProvider {
  'credentials' = 'credentials',
  'facebook' = 'facebook',
  'instagram' = 'instagram',
  'google' = 'google',
  'chat' = 'chat',
  'alexa' = 'alexa',
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

  @Column()
  provider: string;

  //virtual field
  password: string;
  //virtual field
  password_salt: string;

  @Column()
  password_hash: string;

  @Column()
  email_verified: Date;

  @Column()
  password_reset_token: string;

  @Column({
    type: 'varchar',
    length: 45,
    select: false,
  })
  remote_reset_ip: string;

  @Column()
  deleted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  public get checkPassword(): boolean {
    return bcrypt.compareSync(this.password, this.password_hash);
  }

  public get generateToken() {
    const now = Math.floor(Date.now() / 1000);

    const payload = {
      id: this.id,
      firstname: this.first_name,
      email: this.email,
      role: this.role,
      iat: now,
      exp: now + 60 * 60 * 5 * 1, // expire 5 horas
    };

    // return {
    //   ...payload,
    //   token: jwt.sign(payload, process.env.APP_SECRET),
    // };

    // o arquivo 'private.key' pode não estar no mesmo diretório que o programa
    const privateKey = fs.readFileSync(
      path.resolve(__dirname, '../../keys/private.key')
    );

    return {
      ...payload,
      token: jwt.sign(
        payload,
        { key: privateKey, passphrase: process.env.APP_SECRET },
        { algorithm: 'RS256' }
      ),
    };
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async encryptPassword() {
    if (this.password) {
      this.password_salt = await bcrypt.genSalt(10);
      this.password_hash = await bcrypt.hash(this.password, this.password_salt);
      console.log(`encryptPassword this.password`);
      console.log(this.password);
      console.log(`encryptPassword this.password_hash`);
      console.log(this.password_hash);
    }
    this.password = null;
    this.password_salt = null;
  }

  public get generateLoginActivate() {
    const now = Math.floor(Date.now() / 1000);

    const payload = {
      id: this.id,
      iat: now,
      exp: now + 60 * 15, // expire 15 minutos
    };

    const secret = this.password_hash + '-' + this.created_at;

    const token = jwt.sign(payload, secret);
    this.email_verified = null;
    this.password_reset_token = token;

    return token;
  }
}

export { User, UserRole, UserProvider };
