import { Body, Controller, Get, Param, Post, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { CriarIngressoDto, IngressoService } from './ingresso.service';

@Controller('ingressos')
export class IngressoController {
  constructor(private readonly ingressoService: IngressoService) {}

  @Get()
  @Render('ingressos/lista')
  async listarIngressos() {
    const ingressos = await this.ingressoService.findAll();
    return {
      titulo: 'Ingressos — AlvesxEvents',
      ingressos,
    };
  }

  @Get('novo')
  @Render('ingressos/formulario')
  async formularioNovoIngresso() {
    const [eventos, clientes] = await Promise.all([
      this.ingressoService.listarEventos(),
      this.ingressoService.listarClientes(),
    ]);

    return {
      titulo: 'Novo Ingresso — AlvesxEvents',
      ingresso: null,
      eventos,
      clientes,
    };
  }

  @Post('novo')
  async criarIngresso(@Body() body: CriarIngressoDto, @Res() res: Response) {
    await this.ingressoService.create(body);
    return res.redirect('/ingressos');
  }

  @Get(':id/atualizacao')
  @Render('ingressos/formulario')
  async formularioAtualizacaoIngresso(@Param('id') id: string) {
    const [ingresso, eventos, clientes] = await Promise.all([
      this.ingressoService.findOne(Number(id)),
      this.ingressoService.listarEventos(),
      this.ingressoService.listarClientes(),
    ]);

    return {
      titulo: ingresso
        ? `Atualização de Ingresso #${ingresso.id_ingresso}`
        : 'Ingresso não encontrado',
      ingresso,
      eventos,
      clientes,
    };
  }

  @Get(':id')
  @Render('ingressos/formulario')
  async formularioEditarIngresso(@Param('id') id: string) {
    const [ingresso, eventos, clientes] = await Promise.all([
      this.ingressoService.findOne(Number(id)),
      this.ingressoService.listarEventos(),
      this.ingressoService.listarClientes(),
    ]);

    return {
      titulo: ingresso
        ? `Atualização de Ingresso #${ingresso.id_ingresso}`
        : 'Ingresso não encontrado',
      ingresso,
      eventos,
      clientes,
    };
  }

  @Post(':id/atualizacao')
  async atualizarIngresso(
    @Param('id') id: string,
    @Body() body: CriarIngressoDto,
    @Res() res: Response,
  ) {
    await this.ingressoService.update(Number(id), body);
    return res.redirect('/ingressos');
  }

  @Get(':id/excluir')
  async excluirIngressoGet(@Param('id') id: string, @Res() res: Response) {
    await this.ingressoService.remove(Number(id));
    return res.redirect('/ingressos');
  }

  @Post(':id/excluir')
  async excluirIngressoPost(@Param('id') id: string, @Res() res: Response) {
    await this.ingressoService.remove(Number(id));
    return res.redirect('/ingressos');
  }
}