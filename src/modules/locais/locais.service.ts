import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DATABASE_SOURCE } from '../../config/constants/database-source';
import { Local } from './locais.entity';

export interface CriarLocalDto {
  nome: string;
  endereco: string;
  capacidade: number | string;
}

@Injectable()
export class LocaisService {
  private readonly localRepository: Repository<Local>;

  constructor(
    @Inject(DATABASE_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.localRepository = this.dataSource.getRepository(Local);
  }

  async findAll(): Promise<Local[]> {
    return this.localRepository.find({
      order: { id_local: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Local | null> {
    return this.localRepository.findOne({
      where: { id_local: id },
    });
  }

  async create(dados: CriarLocalDto): Promise<Local> {
    const novoLocal = this.localRepository.create({
      nome: (dados.nome ?? '').trim(),
      endereco: (dados.endereco ?? '').trim(),
      capacidade: Number(dados.capacidade) || 0,
    });

    return this.localRepository.save(novoLocal);
  }

  async update(id: number, dados: Partial<CriarLocalDto>): Promise<Local> {
    const local = await this.findOne(id);
    if (!local) {
      throw new NotFoundException(`Local com id ${id} não encontrado.`);
    }

    if (dados.nome !== undefined) local.nome = dados.nome.trim();
    if (dados.endereco !== undefined) local.endereco = dados.endereco.trim();
    if (dados.capacidade !== undefined) {
      local.capacidade = Number(dados.capacidade) || 0;
    }

    return this.localRepository.save(local);
  }

  async remove(id: number): Promise<void> {
    const resultado = await this.localRepository.delete({ id_local: id });
    if (!resultado.affected) {
      throw new NotFoundException(`Local com id ${id} não encontrado.`);
    }
  }
}