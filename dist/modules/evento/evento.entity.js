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
exports.Evento = void 0;
const typeorm_1 = require("typeorm");
const artista_entity_1 = require("../artista/artista.entity");
const locais_entity_1 = require("../locais/locais.entity");
let Evento = class Evento {
    id_evento;
    nome;
    descricao;
    data;
    horario;
    status;
    id_local;
    local;
    artistas;
};
exports.Evento = Evento;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_evento' }),
    __metadata("design:type", Number)
], Evento.prototype, "id_evento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nome', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Evento.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'descricao', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Evento.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'data', type: 'date' }),
    __metadata("design:type", String)
], Evento.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'horario', type: 'time' }),
    __metadata("design:type", String)
], Evento.prototype, "horario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Evento.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_local', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], Evento.prototype, "id_local", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => locais_entity_1.Local, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'id_local' }),
    __metadata("design:type", Object)
], Evento.prototype, "local", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => artista_entity_1.Artista),
    (0, typeorm_1.JoinTable)({
        name: 'Evento_Artista',
        joinColumn: { name: 'id_evento', referencedColumnName: 'id_evento' },
        inverseJoinColumn: {
            name: 'id_artista',
            referencedColumnName: 'id_artista',
        },
    }),
    __metadata("design:type", Array)
], Evento.prototype, "artistas", void 0);
exports.Evento = Evento = __decorate([
    (0, typeorm_1.Entity)('Eventos')
], Evento);
