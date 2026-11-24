import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { ArtistaModule } from './modules/artista/artista.module';
import { EventoModule } from './modules/evento/evento.module';
import { LocaisModule } from './modules/locais/locais.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { IngressoModule } from './modules/ingresso/ingresso.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ArtistaModule,
    EventoModule,
    LocaisModule,
    ClienteModule,
    IngressoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}