import { Body, Controller, Get, Param, Post, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { CriarLocalDto, LocaisService } from './locais.service';

@Controller('locais')
export class LocaisController {
  constructor(private readonly locaisService: LocaisService) {}

  @Get()
  @Render('locais/lista')
  async listar() {
    const locais = await this.locaisService.findAll();
    return {
      titulo: 'Locais — AlvesxEvents',
      locais,
    };
  }

  @Get('novo')
  @Render('locais/formulario')
  formularioNovo() {
    return {
      titulo: 'Novo Local — AlvesxEvents',
      local: null,
    };
  }

  @Post('novo')
  async criar(@Body() body: CriarLocalDto, @Res() res: Response) {
    await this.locaisService.create(body);
    return res.redirect('/locais');
  }

  @Get(':id/atualizacao')
  @Render('locais/formulario')
  async formularioAtualizacao(@Param('id') id: string) {
    const local = await this.locaisService.findOne(Number(id));
    return {
      titulo: local ? `Atualização de Local - ${local.nome}` : 'Local não encontrado',
      local,
    };
  }

  @Get(':id')
  @Render('locais/formulario')
  async formularioEditar(@Param('id') id: string) {
    const local = await this.locaisService.findOne(Number(id));
    return {
      titulo: local ? `Atualização de Local - ${local.nome}` : 'Local não encontrado',
      local,
    };
  }

  @Post(':id/atualizacao')
  async atualizar(
    @Param('id') id: string,
    @Body() body: CriarLocalDto,
    @Res() res: Response,
  ) {
    await this.locaisService.update(Number(id), body);
    return res.redirect('/locais');
  }

  @Get(':id/excluir')
  async excluirGet(@Param('id') id: string, @Res() res: Response) {
    await this.locaisService.remove(Number(id));
    return res.redirect('/locais');
  }

  @Post(':id/excluir')
  async excluirPost(@Param('id') id: string, @Res() res: Response) {
    await this.locaisService.remove(Number(id));
    return res.redirect('/locais');
  }
}