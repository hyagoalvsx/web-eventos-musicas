import { Injectable, NotFoundException } from '@nestjs/common';

export interface LocalItem {
  id: number;
  nome: string;
  endereco: string;
  capacidade: number;
}

export interface CriarLocalDto {
  nome: string;
  endereco: string;
  capacidade: number | string;
}

@Injectable()
export class LocaisService {
  private locais: LocalItem[] = [
    {
      id: 1,
      nome: 'Arena Show',
      endereco: 'Rua Principal, 100',
      capacidade: 500,
    },
  ];
  private proximoId = 2;

  findAll(): LocalItem[] {
    return this.locais;
  }

  findOne(id: number): LocalItem | undefined {
    return this.locais.find((local) => local.id === id);
  }

  create(dados: CriarLocalDto): LocalItem {
    const novoLocal: LocalItem = {
      id: this.proximoId++,
      nome: (dados.nome ?? '').trim(),
      endereco: (dados.endereco ?? '').trim(),
      capacidade: Number(dados.capacidade) || 0,
    };

    this.locais.push(novoLocal);
    return novoLocal;
  }

  update(id: number, dados: Partial<CriarLocalDto>): LocalItem {
    const index = this.locais.findIndex((local) => local.id === id);
    if (index === -1) {
      throw new NotFoundException(`Local com id ${id} não encontrado.`);
    }

    const atual = this.locais[index];
    const atualizado: LocalItem = {
      ...atual,
      nome: dados.nome !== undefined ? dados.nome.trim() : atual.nome,
      endereco:
        dados.endereco !== undefined ? dados.endereco.trim() : atual.endereco,
      capacidade:
        dados.capacidade !== undefined
          ? Number(dados.capacidade) || 0
          : atual.capacidade,
    };

    this.locais[index] = atualizado;
    return atualizado;
  }

  remove(id: number): void {
    const index = this.locais.findIndex((local) => local.id === id);
    if (index === -1) {
      throw new NotFoundException(`Local com id ${id} não encontrado.`);
    }
    this.locais.splice(index, 1);
  }
}