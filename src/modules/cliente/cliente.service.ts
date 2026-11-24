import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { DATABASE_SOURCE } from '../../config/constants/database-source';
import { Evento } from '../evento/evento.entity';
import { Cliente } from './cliente.entity';

export interface CriarClienteDto {
  nome: string;
  email: string;
  telefone?: string;
  eventosIds?: number[] | string[] | number | string;
}

@Injectable()
export class ClienteService {
  private readonly clienteRepository: Repository<Cliente>;
  private readonly eventoRepository: Repository<Evento>;

  constructor(
    @Inject(DATABASE_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.clienteRepository = this.dataSource.getRepository(Cliente);
    this.eventoRepository = this.dataSource.getRepository(Evento);
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find({
      relations: { eventosParticipacao: true },
      order: { id_cliente: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Cliente | null> {
    return this.clienteRepository.findOne({
      where: { id_cliente: id },
      relations: { eventosParticipacao: true },
    });
  }

  async listarEventos(): Promise<Evento[]> {
    return this.eventoRepository.find({ order: { nome: 'ASC' } });
  }

  private normalizarIds(ids?: number[] | string[] | number | string): number[] {
    if (!ids) return [];
    const lista = Array.isArray(ids) ? ids : [ids];
    return lista
      .map((item) => Number(item))
      .filter((num) => !Number.isNaN(num) && num > 0);
  }

  async create(dados: CriarClienteDto): Promise<Cliente> {
    const eventosIds = this.normalizarIds(dados.eventosIds);
    const eventosParticipacao =
      eventosIds.length > 0
        ? await this.eventoRepository.findBy({ id_evento: In(eventosIds) })
        : [];

    const novoCliente = this.clienteRepository.create({
      nome: (dados.nome ?? '').trim(),
      email: (dados.email ?? '').trim(),
      telefone: dados.telefone?.trim() || null,
      eventosParticipacao,
    });

    return this.clienteRepository.save(novoCliente);
  }

  async update(id: number, dados: Partial<CriarClienteDto>): Promise<Cliente> {
    const cliente = await this.findOne(id);
    if (!cliente) {
      throw new NotFoundException(`Cliente com id ${id} não encontrado.`);
    }

    if (dados.nome !== undefined) cliente.nome = dados.nome.trim();
    if (dados.email !== undefined) cliente.email = dados.email.trim();
    if (dados.telefone !== undefined) {
      cliente.telefone = dados.telefone.trim() || null;
    }
    if (dados.eventosIds !== undefined) {
      const eventosIds = this.normalizarIds(dados.eventosIds);
      cliente.eventosParticipacao =
        eventosIds.length > 0
          ? await this.eventoRepository.findBy({ id_evento: In(eventosIds) })
          : [];
    }

    return this.clienteRepository.save(cliente);
  }

  async remove(id: number): Promise<void> {
    const resultado = await this.clienteRepository.delete({ id_cliente: id });
    if (!resultado.affected) {
      throw new NotFoundException(`Cliente com id ${id} não encontrado.`);
    }
  }
}