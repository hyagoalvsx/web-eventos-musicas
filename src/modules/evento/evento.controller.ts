import { Controller, Get, Param, Render } from '@nestjs/common';
import { EventoService } from './evento.service';

@Controller('eventos')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Get()
  @Render('eventos/lista')
  listarEventos() {
    return {
      titulo: 'Eventos Musicais',
      listaEventos: this.eventoService.findAll(),
    };
  }

  @Get(':id')
  @Render('eventos/formulario')
  detalhesEvento(@Param('id') id: string) {
    const evento = this.eventoService.findOne(Number(id));
    return {
      titulo: evento ? `Evento: ${evento.nome}` : 'Novo Evento',
      evento,
    };
  }
}