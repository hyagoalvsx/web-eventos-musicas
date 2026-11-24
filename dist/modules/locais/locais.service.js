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
exports.LocaisService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const database_source_1 = require("../../config/constants/database-source");
const locais_entity_1 = require("./locais.entity");
let LocaisService = class LocaisService {
    dataSource;
    localRepository;
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.localRepository = this.dataSource.getRepository(locais_entity_1.Local);
    }
    async findAll() {
        return this.localRepository.find({
            order: { id_local: 'DESC' },
        });
    }
    async findOne(id) {
        return this.localRepository.findOne({
            where: { id_local: id },
        });
    }
    async create(dados) {
        const novoLocal = this.localRepository.create({
            nome: (dados.nome ?? '').trim(),
            endereco: (dados.endereco ?? '').trim(),
            capacidade: Number(dados.capacidade) || 0,
        });
        return this.localRepository.save(novoLocal);
    }
    async update(id, dados) {
        const local = await this.findOne(id);
        if (!local) {
            throw new common_1.NotFoundException(`Local com id ${id} não encontrado.`);
        }
        if (dados.nome !== undefined)
            local.nome = dados.nome.trim();
        if (dados.endereco !== undefined)
            local.endereco = dados.endereco.trim();
        if (dados.capacidade !== undefined) {
            local.capacidade = Number(dados.capacidade) || 0;
        }
        return this.localRepository.save(local);
    }
    async remove(id) {
        const resultado = await this.localRepository.delete({ id_local: id });
        if (!resultado.affected) {
            throw new common_1.NotFoundException(`Local com id ${id} não encontrado.`);
        }
    }
};
exports.LocaisService = LocaisService;
exports.LocaisService = LocaisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_source_1.DATABASE_SOURCE)),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], LocaisService);
