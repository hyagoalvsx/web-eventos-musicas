import { Module } from '@nestjs/common';
import { IngressoController } from './ingresso.controller';
import { IngressoService } from './ingresso.service';

@Module({
  controllers: [IngressoController],
  providers: [IngressoService],
  exports: [IngressoService],
})
export class IngressoModule {}