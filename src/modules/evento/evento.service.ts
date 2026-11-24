import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { DATABASE_SOURCE } from '../../config/constants/database-source';
import { Artista } from '../artista/artista.entity';
import { Local } from '../locais/locais.entity';
import { Evento } from './evento.entity';

export interface CriarEventoDto {
  nome: string;
  descricao?: string;
  data: string;
  horario: string;
  status: string;
  id_local?: number | string | null;
  artistasIds?: number[] | string[] | number | string;
}

@Injectable()
export class EventoService {
  private readonly eventoRepository: Repository<Evento>;
  private readonly localRepository: Repository<Local>;
  private readonly artistaRepository: Repository<Artista>;

  constructor(
    @Inject(DATABASE_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.eventoRepository = this.dataSource.getRepository(Evento);
    this.localRepository = this.dataSource.getRepository(Local);
    this.artistaRepository = this.dataSource.getRepository(Artista);
  }

 async findAll(): Promise<Evento[]> {
    return this.eventoRepository.find({
      relations: { local: true, artistas: true },
      order: { id_evento: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Evento | null> {
    return this.eventoRepository.findOne({
      where: { id_evento: id },
      relations: { local: true, artistas: true },
    });
  }
  async listarLocais(): Promise<Local[]> {
    return this.localRepository.find({ order: { nome: 'ASC' } });
  }

  async listarArtistas(): Promise<Artista[]> {
    return this.artistaRepository.find({ order: { nome_artistico: 'ASC' } });
  }

  private normalizarIdsArtistas(
    ids?: number[] | string[] | number | string,
  ): number[] {
    if (!ids) return [];
    const lista = Array.isArray(ids) ? ids : [ids];
    return lista
      .map((item) => Number(item))
      .filter((num) => !Number.isNaN(num) && num > 0);
  }

  async create(dados: CriarEventoDto): Promise<Evento> {
    const idLocalNum =
      dados.id_local !== undefined &&
      dados.id_local !== null &&
      String(dados.id_local).trim() !== ''
        ? Number(dados.id_local)
        : null;

    const artistasIds = this.normalizarIdsArtistas(dados.artistasIds);
    const artistas =
      artistasIds.length > 0
        ? await this.artistaRepository.findBy({ id_artista: In(artistasIds) })
        : [];

    const novoEvento = this.eventoRepository.create({
      nome: (dados.nome ?? '').trim(),
      descricao: dados.descricao?.trim() || null,
      data: dados.data,
      horario: dados.horario,
      status: (dados.status ?? 'Ativo').trim(),
      id_local: idLocalNum && !Number.isNaN(idLocalNum) ? idLocalNum : null,
      artistas,
    });

    return this.eventoRepository.save(novoEvento);
  }

  async update(id: number, dados: Partial<CriarEventoDto>): Promise<Evento> {
    const evento = await this.findOne(id);
    if (!evento) {
      throw new NotFoundException(`Evento com id ${id} não encontrado.`);
    }

    if (dados.nome !== undefined) evento.nome = dados.nome.trim();
    if (dados.descricao !== undefined) {
      evento.descricao = dados.descricao.trim() || null;
    }
    if (dados.data !== undefined) evento.data = dados.data;
    if (dados.horario !== undefined) evento.horario = dados.horario;
    if (dados.status !== undefined) evento.status = dados.status.trim();

    if (dados.id_local !== undefined) {
      const idLocalNum =
        dados.id_local !== null && String(dados.id_local).trim() !== ''
          ? Number(dados.id_local)
          : null;
      evento.id_local =
        idLocalNum && !Number.isNaN(idLocalNum) ? idLocalNum : null;
    }

    if (dados.artistasIds !== undefined) {
      const artistasIds = this.normalizarIdsArtistas(dados.artistasIds);
      evento.artistas =
        artistasIds.length > 0
          ? await this.artistaRepository.findBy({ id_artista: In(artistasIds) })
          : [];
    }

    return this.eventoRepository.save(evento);
  }

  async remove(id: number): Promise<void> {
    const resultado = await this.eventoRepository.delete({ id_evento: id });
    if (!resultado.affected) {
      throw new NotFoundException(`Evento com id ${id} não encontrado.`);
    }
  }
}