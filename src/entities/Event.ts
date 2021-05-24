import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum EventStatus {
  'inicial' = 'inicial',
  'Contratado' = 'Contratado',
  'Em Andamento' = 'Em Andamento',
  'Concluido' = 'Concluido',
  'Cancelado' = 'Cancelado',
}

@Entity('events')
class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.inicial,
  })
  status: EventStatus;

  @Column()
  initial_date: Date;

  @Column()
  event_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Event };
