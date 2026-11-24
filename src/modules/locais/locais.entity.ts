import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Locais')
export class Local {
  @PrimaryGeneratedColumn({ name: 'id_local' })
  id_local!: number;

  @Column({ name: 'nome', type: 'varchar', length: 100 })
  nome!: string;

  @Column({ name: 'endereco', type: 'varchar', length: 255 })
  endereco!: string;

  @Column({ name: 'capacidade', type: 'int' })
  capacidade!: number;
}