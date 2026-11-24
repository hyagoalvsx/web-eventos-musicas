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
exports.IngressoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const database_source_1 = require("../../config/constants/database-source");
const cliente_entity_1 = require("../cliente/cliente.entity");
const evento_entity_1 = require("../evento/evento.entity");
const ingresso_entity_1 = require("./ingresso.entity");
let IngressoService = class IngressoService {
    dataSource;
    ingressoRepository;
    eventoRepository;
    clienteRepository;
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.ingressoRepository = this.dataSource.getRepository(ingresso_entity_1.Ingresso);
        this.eventoRepository = this.dataSource.getRepository(evento_entity_1.Evento);
        this.clienteRepository = this.dataSource.getRepository(cliente_entity_1.Cliente);
    }
    async findAll() {
        return this.ingressoRepository.find({
            relations: { evento: true, cliente: true },
            order: { id_ingresso: 'DESC' },
        });
    }
    async findOne(id) {
        return this.ingressoRepository.findOne({
            where: { id_ingresso: id },
            relations: { evento: true, cliente: true },
        });
    }
    async listarEventos() {
        return this.eventoRepository.find({ order: { nome: 'ASC' } });
    }
    async listarClientes() {
        return this.clienteRepository.find({ order: { nome: 'ASC' } });
    }
    async create(dados) {
        const precoNum = Number(dados.preco);
        const idEventoNum = Number(dados.id_evento);
        const idClienteNum = dados.id_cliente !== undefined &&
            dados.id_cliente !== null &&
            String(dados.id_cliente).trim() !== ''
            ? Number(dados.id_cliente)
            : null;
        const novoIngresso = this.ingressoRepository.create({
            tipo: (dados.tipo ?? '').trim(),
            preco: Number.isNaN(precoNum) ? 0 : precoNum,
            status: (dados.status ?? 'Disponível').trim(),
            id_evento: idEventoNum,
            id_cliente: idClienteNum && !Number.isNaN(idClienteNum) ? idClienteNum : null,
        });
        return this.ingressoRepository.save(novoIngresso);
    }
    async update(id, dados) {
        const ingresso = await this.findOne(id);
        if (!ingresso) {
            throw new common_1.NotFoundException(`Ingresso com id ${id} não encontrado.`);
        }
        if (dados.tipo !== undefined)
            ingresso.tipo = dados.tipo.trim();
        if (dados.preco !== undefined) {
            const precoNum = Number(dados.preco);
            if (!Number.isNaN(precoNum))
                ingresso.preco = precoNum;
        }
        if (dados.status !== undefined)
            ingresso.status = dados.status.trim();
        if (dados.id_evento !== undefined) {
            ingresso.id_evento = Number(dados.id_evento);
        }
        if (dados.id_cliente !== undefined) {
            const idClienteNum = dados.id_cliente !== null && String(dados.id_cliente).trim() !== ''
                ? Number(dados.id_cliente)
                : null;
            ingresso.id_cliente =
                idClienteNum && !Number.isNaN(idClienteNum) ? idClienteNum : null;
        }
        return this.ingressoRepository.save(ingresso);
    }
    async remove(id) {
        const resultado = await this.ingressoRepository.delete({ id_ingresso: id });
        if (!resultado.affected) {
            throw new common_1.NotFoundException(`Ingresso com id ${id} não encontrado.`);
        }
    }
};
exports.IngressoService = IngressoService;
exports.IngressoService = IngressoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_source_1.DATABASE_SOURCE)),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], IngressoService);
