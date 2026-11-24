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
exports.IngressoController = void 0;
const common_1 = require("@nestjs/common");
const ingresso_service_1 = require("./ingresso.service");
let IngressoController = class IngressoController {
    ingressoService;
    constructor(ingressoService) {
        this.ingressoService = ingressoService;
    }
    async listarIngressos() {
        const ingressos = await this.ingressoService.findAll();
        return {
            titulo: 'Ingressos — AlvesxEvents',
            ingressos,
        };
    }
    async formularioNovoIngresso() {
        const [eventos, clientes] = await Promise.all([
            this.ingressoService.listarEventos(),
            this.ingressoService.listarClientes(),
        ]);
        return {
            titulo: 'Novo Ingresso — AlvesxEvents',
            ingresso: null,
            eventos,
            clientes,
        };
    }
    async criarIngresso(body, res) {
        await this.ingressoService.create(body);
        return res.redirect('/ingressos');
    }
    async formularioAtualizacaoIngresso(id) {
        const [ingresso, eventos, clientes] = await Promise.all([
            this.ingressoService.findOne(Number(id)),
            this.ingressoService.listarEventos(),
            this.ingressoService.listarClientes(),
        ]);
        return {
            titulo: ingresso
                ? `Atualização de Ingresso #${ingresso.id_ingresso}`
                : 'Ingresso não encontrado',
            ingresso,
            eventos,
            clientes,
        };
    }
    async formularioEditarIngresso(id) {
        const [ingresso, eventos, clientes] = await Promise.all([
            this.ingressoService.findOne(Number(id)),
            this.ingressoService.listarEventos(),
            this.ingressoService.listarClientes(),
        ]);
        return {
            titulo: ingresso
                ? `Atualização de Ingresso #${ingresso.id_ingresso}`
                : 'Ingresso não encontrado',
            ingresso,
            eventos,
            clientes,
        };
    }
    async atualizarIngresso(id, body, res) {
        await this.ingressoService.update(Number(id), body);
        return res.redirect('/ingressos');
    }
    async excluirIngressoGet(id, res) {
        await this.ingressoService.remove(Number(id));
        return res.redirect('/ingressos');
    }
    async excluirIngressoPost(id, res) {
        await this.ingressoService.remove(Number(id));
        return res.redirect('/ingressos');
    }
};
exports.IngressoController = IngressoController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('ingressos/lista'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IngressoController.prototype, "listarIngressos", null);
__decorate([
    (0, common_1.Get)('novo'),
    (0, common_1.Render)('ingressos/formulario'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IngressoController.prototype, "formularioNovoIngresso", null);
__decorate([
    (0, common_1.Post)('novo'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IngressoController.prototype, "criarIngresso", null);
__decorate([
    (0, common_1.Get)(':id/atualizacao'),
    (0, common_1.Render)('ingressos/formulario'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IngressoController.prototype, "formularioAtualizacaoIngresso", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.Render)('ingressos/formulario'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IngressoController.prototype, "formularioEditarIngresso", null);
__decorate([
    (0, common_1.Post)(':id/atualizacao'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], IngressoController.prototype, "atualizarIngresso", null);
__decorate([
    (0, common_1.Get)(':id/excluir'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], IngressoController.prototype, "excluirIngressoGet", null);
__decorate([
    (0, common_1.Post)(':id/excluir'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], IngressoController.prototype, "excluirIngressoPost", null);
exports.IngressoController = IngressoController = __decorate([
    (0, common_1.Controller)('ingressos'),
    __metadata("design:paramtypes", [ingresso_service_1.IngressoService])
], IngressoController);
