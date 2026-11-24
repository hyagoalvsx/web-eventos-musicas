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
exports.ArtistaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const database_source_1 = require("../../config/constants/database-source");
const artista_entity_1 = require("./artista.entity");
let ArtistaService = class ArtistaService {
    dataSource;
    artistaRepository;
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.artistaRepository = this.dataSource.getRepository(artista_entity_1.Artista);
    }
    async findAll() {
        return this.artistaRepository.find({
            order: { id_artista: 'DESC' },
        });
    }
    async findOne(id) {
        return this.artistaRepository.findOne({
            where: { id_artista: id },
        });
    }
    async create(dados) {
        const novoArtista = this.artistaRepository.create({
            nome_artistico: (dados.nome_artistico ?? '').trim(),
            nome_completo: (dados.nome_completo ?? '').trim(),
            genero_musical: dados.genero_musical?.trim() || null,
        });
        return this.artistaRepository.save(novoArtista);
    }
    async update(id, dados) {
        const artista = await this.findOne(id);
        if (!artista) {
            throw new common_1.NotFoundException(`Artista com id ${id} não encontrado.`);
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
    async remove(id) {
        const resultado = await this.artistaRepository.delete({ id_artista: id });
        if (!resultado.affected) {
            throw new common_1.NotFoundException(`Artista com id ${id} não encontrado.`);
        }
    }
};
exports.ArtistaService = ArtistaService;
exports.ArtistaService = ArtistaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_source_1.DATABASE_SOURCE)),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ArtistaService);
