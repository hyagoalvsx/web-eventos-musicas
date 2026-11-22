import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistaModule } from './modules/artista/artista.module';
import { EventoModule } from './modules/evento/evento.module';
import { LocaisModule } from './modules/locais/locais.module';

@Module({
  imports: [ArtistaModule, EventoModule, LocaisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}