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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingresso = void 0;
const typeorm_1 = require("typeorm");
const cliente_entity_1 = require("../cliente/cliente.entity");
const evento_entity_1 = require("../evento/evento.entity");
let Ingresso = class Ingresso {
    id_ingresso;
    tipo;
    preco;
    status;
    id_evento;
    evento;
    id_cliente;
    cliente;
};
exports.Ingresso = Ingresso;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_ingresso' }),
    __metadata("design:type", Number)
], Ingresso.prototype, "id_ingresso", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tipo', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Ingresso.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'preco', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Ingresso.prototype, "preco", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Ingresso.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_evento', type: 'int' }),
    __metadata("design:type", Number)
], Ingresso.prototype, "id_evento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => evento_entity_1.Evento, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'id_evento' }),
    __metadata("design:type", evento_entity_1.Evento)
], Ingresso.prototype, "evento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_cliente', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Ingresso.prototype, "id_cliente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cliente_entity_1.Cliente, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'id_cliente' }),
    __metadata("design:type", Object)
], Ingresso.prototype, "cliente", void 0);
exports.Ingresso = Ingresso = __decorate([
    (0, typeorm_1.Entity)('Ingressos')
], Ingresso);
