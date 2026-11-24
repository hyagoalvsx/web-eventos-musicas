import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DATABASE_SOURCE } from '../../config/constants/database-source';
import { Cliente } from '../cliente/cliente.entity';
import { Evento } from '../evento/evento.entity';
import { Ingresso } from './ingresso.entity';

export interface CriarIngressoDto {
  tipo: string;
  preco: number | string;
  status: string;
  id_evento: number | string;
  id_cliente?: number | string | null;
}

@Injectable()
export class IngressoService {
  private readonly ingressoRepository: Repository<Ingresso>;
  private readonly eventoRepository: Repository<Evento>;
  private readonly clienteRepository: Repository<Cliente>;

  constructor(
    @Inject(DATABASE_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.ingressoRepository = this.dataSource.getRepository(Ingresso);
    this.eventoRepository = this.dataSource.getRepository(Evento);
    this.clienteRepository = this.dataSource.getRepository(Cliente);
  }

  async findAll(): Promise<Ingresso[]> {
    return this.ingressoRepository.find({
      relations: { evento: true, cliente: true },
      order: { id_ingresso: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Ingresso | null> {
    return this.ingressoRepository.findOne({
      where: { id_ingresso: id },
      relations: { evento: true, cliente: true },
    });
  }

  async listarEventos(): Promise<Evento[]> {
    return this.eventoRepository.find({ order: { nome: 'ASC' } });
  }

  async listarClientes(): Promise<Cliente[]> {
    return this.clienteRepository.find({ order: { nome: 'ASC' } });
  }

  async create(dados: CriarIngressoDto): Promise<Ingresso> {
    const precoNum = Number(dados.preco);
    const idEventoNum = Number(dados.id_evento);
    const idClienteNum =
      dados.id_cliente !== undefined &&
      dados.id_cliente !== null &&
      String(dados.id_cliente).trim() !== ''
        ? Number(dados.id_cliente)
        : null;

    const novoIngresso = this.ingressoRepository.create({
      tipo: (dados.tipo ?? '').trim(),
      preco: Number.isNaN(precoNum) ? 0 : precoNum,
      status: (dados.status ?? 'Disponível').trim(),
      id_evento: idEventoNum,
      id_cliente:
        idClienteNum && !Number.isNaN(idClienteNum) ? idClienteNum : null,
    });

    return this.ingressoRepository.save(novoIngresso);
  }

  async update(id: number, dados: Partial<CriarIngressoDto>): Promise<Ingresso> {
    const ingresso = await this.findOne(id);
    if (!ingresso) {
      throw new NotFoundException(`Ingresso com id ${id} não encontrado.`);
    }

    if (dados.tipo !== undefined) ingresso.tipo = dados.tipo.trim();
    if (dados.preco !== undefined) {
      const precoNum = Number(dados.preco);
      if (!Number.isNaN(precoNum)) ingresso.preco = precoNum;
    }
    if (dados.status !== undefined) ingresso.status = dados.status.trim();
    if (dados.id_evento !== undefined) {
      ingresso.id_evento = Number(dados.id_evento);
    }
    if (dados.id_cliente !== undefined) {
      const idClienteNum =
        dados.id_cliente !== null && String(dados.id_cliente).trim() !== ''
          ? Number(dados.id_cliente)
          : null;
      ingresso.id_cliente =
        idClienteNum && !Number.isNaN(idClienteNum) ? idClienteNum : null;
    }

    return this.ingressoRepository.save(ingresso);
  }

  async remove(id: number): Promise<void> {
    const resultado = await this.ingressoRepository.delete({ id_ingresso: id });
    if (!resultado.affected) {
      throw new NotFoundException(`Ingresso com id ${id} não encontrado.`);
    }
  }
}