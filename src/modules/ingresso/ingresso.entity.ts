import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,} from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';
import { Evento } from '../evento/evento.entity';

@Entity('Ingressos')
export class Ingresso {
  @PrimaryGeneratedColumn({ name: 'id_ingresso' })
  id_ingresso!: number;

  @Column({ name: 'tipo', type: 'varchar', length: 50 })
  tipo!: string;

  @Column({ name: 'preco', type: 'decimal', precision: 10, scale: 2 })
  preco!: number;

  @Column({ name: 'status', type: 'varchar', length: 50 })
  status!: string;

  @Column({ name: 'id_evento', type: 'int' })
  id_evento!: number;

  @ManyToOne(() => Evento, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_evento' })
  evento!: Evento;

  @Column({ name: 'id_cliente', type: 'int', nullable: true })
  id_cliente!: number | null;

  @ManyToOne(() => Cliente, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_cliente' })
  cliente!: Cliente | null;
}