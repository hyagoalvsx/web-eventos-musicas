import { Body, Controller, Get, Param, Post, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { ArtistaService, CriarArtistaDto } from './artista.service';

@Controller('artistas')
export class ArtistaController {
  constructor(private readonly artistaService: ArtistaService) {}

  @Get()
  @Render('artista/lista')
  async listarArtistas() {
    const artistas = await this.artistaService.findAll();
    return {
      titulo: 'Artistas — AlvesxEvents',
      artistas,
      listaArtistas: artistas,
    };
  }

  @Get('novo')
  @Render('artista/formulario')
  formularioNovoArtista() {
    return {
      titulo: 'Novo Artista — AlvesxEvents',
      artista: null,
    };
  }

  @Post('novo')
  async criarArtista(@Body() body: CriarArtistaDto, @Res() res: Response) {
    await this.artistaService.create(body);
    return res.redirect('/artistas');
  }

  @Get(':id/atualizacao')
  @Render('artista/formulario')
  async formularioAtualizacaoArtista(@Param('id') id: string) {
    const artista = await this.artistaService.findOne(Number(id));
    return {
      titulo: artista
        ? `Atualização de Artista - ${artista.nome_artistico}`
        : 'Artista não encontrado',
      artista,
    };
  }

  @Get(':id')
  @Render('artista/formulario')
  async formularioEditarArtista(@Param('id') id: string) {
    const artista = await this.artistaService.findOne(Number(id));
    return {
      titulo: artista
        ? `Atualização de Artista - ${artista.nome_artistico}`
        : 'Artista não encontrado',
      artista,
    };
  }

  @Post(':id/atualizacao')
  async atualizarArtista(
    @Param('id') id: string,
    @Body() body: CriarArtistaDto,
    @Res() res: Response,
  ) {
    await this.artistaService.update(Number(id), body);
    return res.redirect('/artistas');
  }

  @Get(':id/excluir')
  async excluirArtistaGet(@Param('id') id: string, @Res() res: Response) {
    await this.artistaService.remove(Number(id));
    return res.redirect('/artistas');
  }

  @Post(':id/excluir')
  async excluirArtistaPost(@Param('id') id: string, @Res() res: Response) {
    await this.artistaService.remove(Number(id));
    return res.redirect('/artistas');
  }
}