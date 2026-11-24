import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn,} from 'typeorm';
import { Evento } from '../evento/evento.entity';

@Entity('Clientes')
export class Cliente {
  @PrimaryGeneratedColumn({ name: 'id_cliente' })
  id_cliente!: number;

  @Column({ name: 'nome', type: 'varchar', length: 100 })
  nome!: string;

  @Column({ name: 'email', type: 'varchar', length: 100, unique: true })
  email!: string;

  @Column({ name: 'telefone', type: 'varchar', length: 20, nullable: true })
  telefone!: string | null;

  @ManyToMany(() => Evento)
  @JoinTable({
    name: 'Participacao_Cliente_Evento',
    joinColumn: { name: 'id_cliente', referencedColumnName: 'id_cliente' },
    inverseJoinColumn: { name: 'id_evento', referencedColumnName: 'id_evento' },
  })
  eventosParticipacao!: Evento[];
}