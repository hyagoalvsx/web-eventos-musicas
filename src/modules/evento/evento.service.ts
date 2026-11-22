import { Injectable } from '@nestjs/common';

export interface EventoItem {
  id: number;
  nome: string;
  descricao: string;
  data: string;
  horario: string;
  local: string;
  status: string;
}

@Injectable()
export class EventoService {
  private eventos: EventoItem[] = [];

  findAll(): EventoItem[] {
    return this.eventos;
  }

  findOne(id: number): EventoItem | undefined {
    return this.eventos.find((e) => e.id === id);
  }
}