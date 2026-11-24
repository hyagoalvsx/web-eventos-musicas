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
exports.EventoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const database_source_1 = require("../../config/constants/database-source");
const artista_entity_1 = require("../artista/artista.entity");
const locais_entity_1 = require("../locais/locais.entity");
const evento_entity_1 = require("./evento.entity");
let EventoService = class EventoService {
    dataSource;
    eventoRepository;
    localRepository;
    artistaRepository;
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.eventoRepository = this.dataSource.getRepository(evento_entity_1.Evento);
        this.localRepository = this.dataSource.getRepository(locais_entity_1.Local);
        this.artistaRepository = this.dataSource.getRepository(artista_entity_1.Artista);
    }
    async findAll() {
        return this.eventoRepository.find({
            relations: { local: true, artistas: true },
            order: { id_evento: 'DESC' },
        });
    }
    async findOne(id) {
        return this.eventoRepository.findOne({
            where: { id_evento: id },
            relations: { local: true, artistas: true },
        });
    }
    async listarLocais() {
        return this.localRepository.find({ order: { nome: 'ASC' } });
    }
    async listarArtistas() {
        return this.artistaRepository.find({ order: { nome_artistico: 'ASC' } });
    }
    normalizarIdsArtistas(ids) {
        if (!ids)
            return [];
        const lista = Array.isArray(ids) ? ids : [ids];
        return lista
            .map((item) => Number(item))
            .filter((num) => !Number.isNaN(num) && num > 0);
    }
    async create(dados) {
        const idLocalNum = dados.id_local !== undefined &&
            dados.id_local !== null &&
            String(dados.id_local).trim() !== ''
            ? Number(dados.id_local)
            : null;
        const artistasIds = this.normalizarIdsArtistas(dados.artistasIds);
        const artistas = artistasIds.length > 0
            ? await this.artistaRepository.findBy({ id_artista: (0, typeorm_1.In)(artistasIds) })
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
    async update(id, dados) {
        const evento = await this.findOne(id);
        if (!evento) {
            throw new common_1.NotFoundException(`Evento com id ${id} não encontrado.`);
        }
        if (dados.nome !== undefined)
            evento.nome = dados.nome.trim();
        if (dados.descricao !== undefined) {
            evento.descricao = dados.descricao.trim() || null;
        }
        if (dados.data !== undefined)
            evento.data = dados.data;
        if (dados.horario !== undefined)
            evento.horario = dados.horario;
        if (dados.status !== undefined)
            evento.status = dados.status.trim();
        if (dados.id_local !== undefined) {
            const idLocalNum = dados.id_local !== null && String(dados.id_local).trim() !== ''
                ? Number(dados.id_local)
                : null;
            evento.id_local =
                idLocalNum && !Number.isNaN(idLocalNum) ? idLocalNum : null;
        }
        if (dados.artistasIds !== undefined) {
            const artistasIds = this.normalizarIdsArtistas(dados.artistasIds);
            evento.artistas =
                artistasIds.length > 0
                    ? await this.artistaRepository.findBy({ id_artista: (0, typeorm_1.In)(artistasIds) })
                    : [];
        }
        return this.eventoRepository.save(evento);
    }
    async remove(id) {
        const resultado = await this.eventoRepository.delete({ id_evento: id });
        if (!resultado.affected) {
            throw new common_1.NotFoundException(`Evento com id ${id} não encontrado.`);
        }
    }
};
exports.EventoService = EventoService;
exports.EventoService = EventoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_source_1.DATABASE_SOURCE)),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], EventoService);
