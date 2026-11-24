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
exports.ArtistaController = void 0;
const common_1 = require("@nestjs/common");
const artista_service_1 = require("./artista.service");
let ArtistaController = class ArtistaController {
    artistaService;
    constructor(artistaService) {
        this.artistaService = artistaService;
    }
    async listarArtistas() {
        const artistas = await this.artistaService.findAll();
        return {
            titulo: 'Artistas — AlvesxEvents',
            artistas,
            listaArtistas: artistas,
        };
    }
    formularioNovoArtista() {
        return {
            titulo: 'Novo Artista — AlvesxEvents',
            artista: null,
        };
    }
    async criarArtista(body, res) {
        await this.artistaService.create(body);
        return res.redirect('/artistas');
    }
    async formularioAtualizacaoArtista(id) {
        const artista = await this.artistaService.findOne(Number(id));
        return {
            titulo: artista
                ? `Atualização de Artista - ${artista.nome_artistico}`
                : 'Artista não encontrado',
            artista,
        };
    }
    async formularioEditarArtista(id) {
        const artista = await this.artistaService.findOne(Number(id));
        return {
            titulo: artista
                ? `Atualização de Artista - ${artista.nome_artistico}`
                : 'Artista não encontrado',
            artista,
        };
    }
    async atualizarArtista(id, body, res) {
        await this.artistaService.update(Number(id), body);
        return res.redirect('/artistas');
    }
    async excluirArtistaGet(id, res) {
        await this.artistaService.remove(Number(id));
        return res.redirect('/artistas');
    }
    async excluirArtistaPost(id, res) {
        await this.artistaService.remove(Number(id));
        return res.redirect('/artistas');
    }
};
exports.ArtistaController = ArtistaController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('artista/lista'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArtistaController.prototype, "listarArtistas", null);
__decorate([
    (0, common_1.Get)('novo'),
    (0, common_1.Render)('artista/formulario'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArtistaController.prototype, "formularioNovoArtista", null);
__decorate([
    (0, common_1.Post)('novo'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ArtistaController.prototype, "criarArtista", null);
__decorate([
    (0, common_1.Get)(':id/atualizacao'),
    (0, common_1.Render)('artista/formulario'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArtistaController.prototype, "formularioAtualizacaoArtista", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.Render)('artista/formulario'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArtistaController.prototype, "formularioEditarArtista", null);
__decorate([
    (0, common_1.Post)(':id/atualizacao'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ArtistaController.prototype, "atualizarArtista", null);
__decorate([
    (0, common_1.Get)(':id/excluir'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ArtistaController.prototype, "excluirArtistaGet", null);
__decorate([
    (0, common_1.Post)(':id/excluir'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ArtistaController.prototype, "excluirArtistaPost", null);
exports.ArtistaController = ArtistaController = __decorate([
    (0, common_1.Controller)('artistas'),
    __metadata("design:paramtypes", [artista_service_1.ArtistaService])
], ArtistaController);
