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
exports.LocaisController = void 0;
const common_1 = require("@nestjs/common");
const locais_service_1 = require("./locais.service");
let LocaisController = class LocaisController {
    locaisService;
    constructor(locaisService) {
        this.locaisService = locaisService;
    }
    async listar() {
        const locais = await this.locaisService.findAll();
        return {
            titulo: 'Locais — AlvesxEvents',
            locais,
        };
    }
    formularioNovo() {
        return {
            titulo: 'Novo Local — AlvesxEvents',
            local: null,
        };
    }
    async criar(body, res) {
        await this.locaisService.create(body);
        return res.redirect('/locais');
    }
    async formularioAtualizacao(id) {
        const local = await this.locaisService.findOne(Number(id));
        return {
            titulo: local ? `Atualização de Local - ${local.nome}` : 'Local não encontrado',
            local,
        };
    }
    async formularioEditar(id) {
        const local = await this.locaisService.findOne(Number(id));
        return {
            titulo: local ? `Atualização de Local - ${local.nome}` : 'Local não encontrado',
            local,
        };
    }
    async atualizar(id, body, res) {
        await this.locaisService.update(Number(id), body);
        return res.redirect('/locais');
    }
    async excluirGet(id, res) {
        await this.locaisService.remove(Number(id));
        return res.redirect('/locais');
    }
    async excluirPost(id, res) {
        await this.locaisService.remove(Number(id));
        return res.redirect('/locais');
    }
};
exports.LocaisController = LocaisController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('locais/lista'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocaisController.prototype, "listar", null);
__decorate([
    (0, common_1.Get)('novo'),
    (0, common_1.Render)('locais/formulario'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LocaisController.prototype, "formularioNovo", null);
__decorate([
    (0, common_1.Post)('novo'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LocaisController.prototype, "criar", null);
__decorate([
    (0, common_1.Get)(':id/atualizacao'),
    (0, common_1.Render)('locais/formulario'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocaisController.prototype, "formularioAtualizacao", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.Render)('locais/formulario'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocaisController.prototype, "formularioEditar", null);
__decorate([
    (0, common_1.Post)(':id/atualizacao'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], LocaisController.prototype, "atualizar", null);
__decorate([
    (0, common_1.Get)(':id/excluir'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LocaisController.prototype, "excluirGet", null);
__decorate([
    (0, common_1.Post)(':id/excluir'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LocaisController.prototype, "excluirPost", null);
exports.LocaisController = LocaisController = __decorate([
    (0, common_1.Controller)('locais'),
    __metadata("design:paramtypes", [locais_service_1.LocaisService])
], LocaisController);
