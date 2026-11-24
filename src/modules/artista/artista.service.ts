import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DATABASE_SOURCE } from '../../config/constants/database-source';
import { Artista } from './artista.entity';

export interface CriarArtistaDto {
  nome_artistico: string;
  nome_completo: string;
  genero_musical?: string;
}

@Injectable()
export class ArtistaService {
  private readonly artistaRepository: Repository<Artista>;

  constructor(
    @Inject(DATABASE_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.artistaRepository = this.dataSource.getRepository(Artista);
  }

  async findAll(): Promise<Artista[]> {
    return this.artistaRepository.find({
      order: { id_artista: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Artista | null> {
    return this.artistaRepository.findOne({
      where: { id_artista: id },
    });
  }

  async create(dados: CriarArtistaDto): Promise<Artista> {
    const novoArtista = this.artistaRepository.create({
      nome_artistico: (dados.nome_artistico ?? '').trim(),
      nome_completo: (dados.nome_completo ?? '').trim(),
      genero_musical: dados.genero_musical?.trim() || null,
    });

    return this.artistaRepository.save(novoArtista);
  }

  async update(id: number, dados: Partial<CriarArtistaDto>): Promise<Artista> {
    const artista = await this.findOne(id);
    if (!artista) {
      throw new NotFoundException(`Artista com id ${id} não encontrado.`);
    }

    if (dados.nome_artistico !== undefined) {
      artista.nome_artistico = dados.nome_artistico.trim();
    }
    if (dados.nome_completo !== undefined) {
      artista.nome_completo = dados.nome_completo.trim();
    }
    if (dados.genero_musical !== undefined) {
      artista.genero_musical = dados.genero_musical.trim() || null;
    }

    return this.artistaRepository.save(artista);
  }

  async remove(id: number): Promise<void> {
    const resultado = await this.artistaRepository.delete({ id_artista: id });
    if (!resultado.affected) {
      throw new NotFoundException(`Artista com id ${id} não encontrado.`);
    }
  }
}