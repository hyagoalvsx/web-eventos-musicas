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
exports.ClienteController = void 0;
const common_1 = require("@nestjs/common");
const cliente_service_1 = require("./cliente.service");
let ClienteController = class ClienteController {
    clienteService;
    constructor(clienteService) {
        this.clienteService = clienteService;
    }
    async listarClientes() {
        const clientes = await this.clienteService.findAll();
        return {
            titulo: 'Clientes — AlvesxEvents',
            clientes,
        };
    }
    async formularioNovoCliente() {
        const eventos = await this.clienteService.listarEventos();
        return {
            titulo: 'Novo Cliente — AlvesxEvents',
            cliente: null,
            eventos,
        };
    }
    async criarCliente(body, res) {
        await this.clienteService.create(body);
        return res.redirect('/clientes');
    }
    async formularioAtualizacaoCliente(id) {
        const [cliente, eventos] = await Promise.all([
            this.clienteService.findOne(Number(id)),
            this.clienteService.listarEventos(),
        ]);
        return {
            titulo: cliente ? `Atualização de Cliente - ${cliente.nome}` : 'Cliente não encontrado',
            cliente,
            eventos,
        };
    }
    async formularioEditarCliente(id) {
        const [cliente, eventos] = await Promise.all([
            this.clienteService.findOne(Number(id)),
            this.clienteService.listarEventos(),
        ]);
        return {
            titulo: cliente ? `Atualização de Cliente - ${cliente.nome}` : 'Cliente não encontrado',
            cliente,
            eventos,
        };
    }
    async atualizarCliente(id, body, res) {
        await this.clienteService.update(Number(id), body);
        return res.redirect('/clientes');
    }
    async excluirClienteGet(id, res) {
        await this.clienteService.remove(Number(id));
        return res.redirect('/clientes');
    }
    async excluirClientePost(id, res) {
        await this.clienteService.remove(Number(id));
        return res.redirect('/clientes');
    }
};
exports.ClienteController = ClienteController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('clientes/lista'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "listarClientes", null);
__decorate([
    (0, common_1.Get)('novo'),
    (0, common_1.Render)('clientes/formulario'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "formularioNovoCliente", null);
__decorate([
    (0, common_1.Post)('novo'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "criarCliente", null);
__decorate([
    (0, common_1.Get)(':id/atualizacao'),
    (0, common_1.Render)('clientes/formulario'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "formularioAtualizacaoCliente", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.Render)('clientes/formulario'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "formularioEditarCliente", null);
__decorate([
    (0, common_1.Post)(':id/atualizacao'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "atualizarCliente", null);
__decorate([
    (0, common_1.Get)(':id/excluir'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "excluirClienteGet", null);
__decorate([
    (0, common_1.Post)(':id/excluir'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "excluirClientePost", null);
exports.ClienteController = ClienteController = __decorate([
    (0, common_1.Controller)('clientes'),
    __metadata("design:paramtypes", [cliente_service_1.ClienteService])
], ClienteController);
