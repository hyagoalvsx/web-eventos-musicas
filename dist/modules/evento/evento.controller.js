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
exports.EventoController = void 0;
const common_1 = require("@nestjs/common");
const evento_service_1 = require("./evento.service");
let EventoController = class EventoController {
    eventoService;
    constructor(eventoService) {
        this.eventoService = eventoService;
    }
    async listarEventos() {
        const eventos = await this.eventoService.findAll();
        return {
            titulo: 'Eventos Musicais — AlvesxEvents',
            eventos,
            listaEventos: eventos,
        };
    }
    async formularioNovoEvento() {
        const [locais, artistas] = await Promise.all([
            this.eventoService.listarLocais(),
            this.eventoService.listarArtistas(),
        ]);
        return {
            titulo: 'Novo Evento — AlvesxEvents',
            evento: null,
            locais,
            artistas,
        };
    }
    async criarEvento(body, res) {
        await this.eventoService.create(body);
        return res.redirect('/eventos');
    }
    async formularioAtualizacaoEvento(id) {
        const [evento, locais, artistas] = await Promise.all([
            this.eventoService.findOne(Number(id)),
            this.eventoService.listarLocais(),
            this.eventoService.listarArtistas(),
        ]);
        return {
            titulo: evento ? `Atualização de Evento - ${evento.nome}` : 'Evento não encontrado',
            evento,
            locais,
            artistas,
        };
    }
    async formularioEditarEvento(id) {
        const [evento, locais, artistas] = await Promise.all([
            this.eventoService.findOne(Number(id)),
            this.eventoService.listarLocais(),
            this.eventoService.listarArtistas(),
        ]);
        return {
            titulo: evento ? `Atualização de Evento - ${evento.nome}` : 'Evento não encontrado',
            evento,
            locais,
            artistas,
        };
    }
    async atualizarEvento(id, body, res) {
        await this.eventoService.update(Number(id), body);
        return res.redirect('/eventos');
    }
    async excluirEventoGet(id, res) {
        await this.eventoService.remove(Number(id));
        return res.redirect('/eventos');
    }
    async excluirEventoPost(id, res) {
        await this.eventoService.remove(Number(id));
        return res.redirect('/eventos');
    }
};
exports.EventoController = EventoController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('eventos/lista'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventoController.prototype, "listarEventos", null);
__decorate([
    (0, common_1.Get)('novo'),
    (0, common_1.Render)('eventos/formulario'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventoController.prototype, "formularioNovoEvento", null);
__decorate([
    (0, common_1.Post)('novo'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventoController.prototype, "criarEvento", null);
__decorate([
    (0, common_1.Get)(':id/atualizacao'),
    (0, common_1.Render)('eventos/formulario'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventoController.prototype, "formularioAtualizacaoEvento", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.Render)('eventos/formulario'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventoController.prototype, "formularioEditarEvento", null);
__decorate([
    (0, common_1.Post)(':id/atualizacao'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], EventoController.prototype, "atualizarEvento", null);
__decorate([
    (0, common_1.Get)(':id/excluir'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventoController.prototype, "excluirEventoGet", null);
__decorate([
    (0, common_1.Post)(':id/excluir'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventoController.prototype, "excluirEventoPost", null);
exports.EventoController = EventoController = __decorate([
    (0, common_1.Controller)('eventos'),
    __metadata("design:paramtypes", [evento_service_1.EventoService])
], EventoController);
