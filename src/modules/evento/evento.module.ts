import { Module } from '@nestjs/common';
import { EventoController } from './evento.controller';
import { EventoService } from './evento.service';

@Module({
  controllers: [EventoController],
  providers: [EventoService],
  exports: [EventoService],
})
export class EventoModule {}