import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CriarLocalDto, LocaisService } from './locais.service';

@Controller('locais')
export class LocaisController {
  constructor(private readonly locaisService: LocaisService) {}

  @Get()
  @Render('locais/lista')
  listarLocais() {
    const locais = this.locaisService.findAll();
    return {
      titulo: 'Locais — AlvesxEvents',
      locais,
      listaLocais: locais,
    };
  }

  @Get('novo')
  @Render('locais/formulario')
  formularioNovoLocal() {
    return {
      titulo: 'Novo Local — AlvesxEvents',
      local: null,
      acao: '/locais/novo',
    };
  }

  @Post('novo')
  criarLocal(@Body() body: CriarLocalDto, @Res() res: Response) {
    this.locaisService.create(body);
    return res.redirect('/locais');
  }

  @Get(':id')
  @Render('locais/formulario')
  formularioEditarLocal(@Param('id') id: string) {
    const local = this.locaisService.findOne(Number(id)) ?? null;
    return {
      titulo: local ? `Editar Local: ${local.nome}` : 'Local não encontrado',
      local,
      acao: local ? `/locais/${local.id}/atualizar` : '/locais/novo',
    };
  }

  @Post(':id/atualizar')
  atualizarLocal(
    @Param('id') id: string,
    @Body() body: CriarLocalDto,
    @Res() res: Response,
  ) {
    this.locaisService.update(Number(id), body);
    return res.redirect('/locais');
  }

  @Post(':id/excluir')
  excluirLocal(@Param('id') id: string, @Res() res: Response) {
    this.locaisService.remove(Number(id));
    return res.redirect('/locais');
  }
}