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
exports.Cliente = void 0;
const typeorm_1 = require("typeorm");
const evento_entity_1 = require("../evento/evento.entity");
let Cliente = class Cliente {
    id_cliente;
    nome;
    email;
    telefone;
    eventosParticipacao;
};
exports.Cliente = Cliente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_cliente' }),
    __metadata("design:type", Number)
], Cliente.prototype, "id_cliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nome', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Cliente.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', length: 100, unique: true }),
    __metadata("design:type", String)
], Cliente.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'telefone', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], Cliente.prototype, "telefone", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => evento_entity_1.Evento),
    (0, typeorm_1.JoinTable)({
        name: 'Participacao_Cliente_Evento',
        joinColumn: { name: 'id_cliente', referencedColumnName: 'id_cliente' },
        inverseJoinColumn: { name: 'id_evento', referencedColumnName: 'id_evento' },
    }),
    __metadata("design:type", Array)
], Cliente.prototype, "eventosParticipacao", void 0);
exports.Cliente = Cliente = __decorate([
    (0, typeorm_1.Entity)('Clientes')
], Cliente);
