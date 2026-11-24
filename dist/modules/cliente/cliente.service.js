"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const database_source_1 = require("../../config/constants/database-source");
const evento_entity_1 = require("../evento/evento.entity");
const cliente_entity_1 = require("./cliente.entity");
let ClienteService = class ClienteService {
    dataSource;
    clienteRepository;
    eventoRepository;
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.clienteRepository = this.dataSource.getRepository(cliente_entity_1.Cliente);
        this.eventoRepository = this.dataSource.getRepository(evento_entity_1.Evento);
    }
    async findAll() {
        return this.clienteRepository.find({
            relations: { eventosParticipacao: true },
            order: { id_cliente: 'DESC' },
        });
    }
    async findOne(id) {
        return this.clienteRepository.findOne({
            where: { id_cliente: id },
            relations: { eventosParticipacao: true },
        });
    }
    async listarEventos() {
        return this.eventoRepository.find({ order: { nome: 'ASC' } });
    }
    normalizarIds(ids) {
        if (!ids)
            return [];
        const lista = Array.isArray(ids) ? ids : [ids];
        return lista
            .map((item) => Number(item))
            .filter((num) => !Number.isNaN(num) && num > 0);
    }
    async create(dados) {
        const eventosIds = this.normalizarIds(dados.eventosIds);
        const eventosParticipacao = eventosIds.length > 0
            ? await this.eventoRepository.findBy({ id_evento: (0, typeorm_1.In)(eventosIds) })
            : [];
        const novoCliente = this.clienteRepository.create({
            nome: (dados.nome ?? '').trim(),
            email: (dados.email ?? '').trim(),
            telefone: dados.telefone?.trim() || null,
            eventosParticipacao,
        });
        return this.clienteRepository.save(novoCliente);
    }
    async update(id, dados) {
        const cliente = await this.findOne(id);
        if (!cliente) {
            throw new common_1.NotFoundException(`Cliente com id ${id} não encontrado.`);
        }
        if (dados.nome !== undefined)
            cliente.nome = dados.nome.trim();
        if (dados.email !== undefined)
            cliente.email = dados.email.trim();
        if (dados.telefone !== undefined) {
            cliente.telefone = dados.telefone.trim() || null;
        }
        if (dados.eventosIds !== undefined) {
            const eventosIds = this.normalizarIds(dados.eventosIds);
            cliente.eventosParticipacao =
                eventosIds.length > 0
                    ? await this.eventoRepository.findBy({ id_evento: (0, typeorm_1.In)(eventosIds) })
                    : [];
        }
        return this.clienteRepository.save(cliente);
    }
    async remove(id) {
        const resultado = await this.clienteRepository.delete({ id_cliente: id });
        if (!resultado.affected) {
            throw new common_1.NotFoundException(`Cliente com id ${id} não encontrado.`);
        }
    }
};
exports.ClienteService = ClienteService;
exports.ClienteService = ClienteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_source_1.DATABASE_SOURCE)),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ClienteService);
