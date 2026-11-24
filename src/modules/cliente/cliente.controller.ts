import { Body, Controller, Get, Param, Post, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { ClienteService, CriarClienteDto } from './cliente.service';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  @Render('clientes/lista')
  async listarClientes() {
    const clientes = await this.clienteService.findAll();
    return {
      titulo: 'Clientes — AlvesxEvents',
      clientes,
    };
  }

  @Get('novo')
  @Render('clientes/formulario')
  async formularioNovoCliente() {
    const eventos = await this.clienteService.listarEventos();
    return {
      titulo: 'Novo Cliente — AlvesxEvents',
      cliente: null,
      eventos,
    };
  }

  @Post('novo')
  async criarCliente(@Body() body: CriarClienteDto, @Res() res: Response) {
    await this.clienteService.create(body);
    return res.redirect('/clientes');
  }

  @Get(':id/atualizacao')
  @Render('clientes/formulario')
  async formularioAtualizacaoCliente(@Param('id') id: string) {
    const [cliente, eventos] = await Promise.all([
      this.clienteService.findOne(Number(id)),
      this.clienteService.listarEventos(),
    ]);

    return {
      titulo: cliente ? `Atualização de Cliente - ${cliente.nome}` : 'Cliente não encontrado',
      cliente,
      eventos,
    };
  }

  @Get(':id')
  @Render('clientes/formulario')
  async formularioEditarCliente(@Param('id') id: string) {
    const [cliente, eventos] = await Promise.all([
      this.clienteService.findOne(Number(id)),
      this.clienteService.listarEventos(),
    ]);

    return {
      titulo: cliente ? `Atualização de Cliente - ${cliente.nome}` : 'Cliente não encontrado',
      cliente,
      eventos,
    };
  }

  @Post(':id/atualizacao')
  async atualizarCliente(
    @Param('id') id: string,
    @Body() body: CriarClienteDto,
    @Res() res: Response,
  ) {
    await this.clienteService.update(Number(id), body);
    return res.redirect('/clientes');
  }

  @Get(':id/excluir')
  async excluirClienteGet(@Param('id') id: string, @Res() res: Response) {
    await this.clienteService.remove(Number(id));
    return res.redirect('/clientes');
  }

  @Post(':id/excluir')
  async excluirClientePost(@Param('id') id: string, @Res() res: Response) {
    await this.clienteService.remove(Number(id));
    return res.redirect('/clientes');
  }
}