import { Controller, Get, Render, Param } from '@nestjs/common';
import { ArtistaService } from './artista.service';

@Controller('artistas')
export class ArtistaController {
  constructor(private readonly artistaService: ArtistaService) {}

  @Get()
  @Render('artista/lista')
  listarArtistas() {
    const lista = this.artistaService.findAll();
    return {
      titulo: 'Festival - Line-up de Artistas',
      listaArtistas: lista,
    };
  }

  @Get(':id')
  @Render('artista/formulario')
  detalhesArtista(@Param('id') id: string) {
    const artista = this.artistaService.findOne(Number(id));
    return {
      titulo: `Detalhes do Artista: ${artista?.nome || ''}`,
      artista,
    };
  }
}