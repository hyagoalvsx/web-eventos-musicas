// src/app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDadosIniciais() {
    return {
      titulo: 'AlvesxEvents — Gerenciamento de Eventos Musicais',
      subtitulo: 'Cadastro e controle de eventos, artistas, locais, clientes e ingressos.',
    };
  }
}