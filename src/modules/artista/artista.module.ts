import { Module } from '@nestjs/common';
import { ArtistaController } from './artista.controller';
import { ArtistaService } from './artista.service';

@Module({
  controllers: [ArtistaController],
  providers: [ArtistaService],
  exports: [ArtistaService],
})
export class ArtistaModule {}