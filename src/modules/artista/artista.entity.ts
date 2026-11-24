import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Artistas')
export class Artista {
  @PrimaryGeneratedColumn({ name: 'id_artista' })
  id_artista!: number;

  @Column({ name: 'nome_artistico', type: 'varchar', length: 100 })
  nome_artistico!: string;

  @Column({ name: 'nome_completo', type: 'varchar', length: 150 })
  nome_completo!: string;

  @Column({
    name: 'genero_musical',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  genero_musical!: string | null;
}