import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artista } from '../artista/artista.entity';
import { Local } from '../locais/locais.entity';

@Entity('Eventos')
export class Evento {
  @PrimaryGeneratedColumn({ name: 'id_evento' })
  id_evento!: number;

  @Column({ name: 'nome', type: 'varchar', length: 100 })
  nome!: string;

  @Column({ name: 'descricao', type: 'text', nullable: true })
  descricao!: string | null;

  @Column({ name: 'data', type: 'date' })
  data!: string;

  @Column({ name: 'horario', type: 'time' })
  horario!: string;

  @Column({ name: 'status', type: 'varchar', length: 50 })
  status!: string;

  @Column({ name: 'id_local', type: 'int', nullable: true })
  id_local!: number | null;

  @ManyToOne(() => Local, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_local' })
  local!: Local | null;

  @ManyToMany(() => Artista)
  @JoinTable({
    name: 'Evento_Artista',
    joinColumn: { name: 'id_evento', referencedColumnName: 'id_evento' },
    inverseJoinColumn: {
      name: 'id_artista',
      referencedColumnName: 'id_artista',
    },
  })
  artistas!: Artista[];
}