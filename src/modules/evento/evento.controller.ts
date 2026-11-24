import { Body, Controller, Get, Param, Post, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { CriarEventoDto, EventoService } from './evento.service';

@Controller('eventos')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Get()
  @Render('eventos/lista')
  async listarEventos() {
    const eventos = await this.eventoService.findAll();
    return {
      titulo: 'Eventos Musicais — AlvesxEvents',
      eventos,
      listaEventos: eventos,
    };
  }

  @Get('novo')
  @Render('eventos/formulario')
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

  @Post('novo')
  async criarEvento(@Body() body: CriarEventoDto, @Res() res: Response) {
    await this.eventoService.create(body);
    return res.redirect('/eventos');
  }

  @Get(':id/atualizacao')
  @Render('eventos/formulario')
  async formularioAtualizacaoEvento(@Param('id') id: string) {
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

  @Get(':id')
  @Render('eventos/formulario')
  async formularioEditarEvento(@Param('id') id: string) {
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

  @Post(':id/atualizacao')
  async atualizarEvento(
    @Param('id') id: string,
    @Body() body: CriarEventoDto,
    @Res() res: Response,
  ) {
    await this.eventoService.update(Number(id), body);
    return res.redirect('/eventos');
  }

  @Get(':id/excluir')
  async excluirEventoGet(@Param('id') id: string, @Res() res: Response) {
    await this.eventoService.remove(Number(id));
    return res.redirect('/eventos');
  }

  @Post(':id/excluir')
  async excluirEventoPost(@Param('id') id: string, @Res() res: Response) {
    await this.eventoService.remove(Number(id));
    return res.redirect('/eventos');
  }
}