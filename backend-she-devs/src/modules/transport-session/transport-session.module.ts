import { Module } from '@nestjs/common';
import { TransportSessionService } from './transport-session.service';
import { TransportSessionController } from './transport-session.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrudService } from 'src/services/crud-service';

@Module({
  controllers: [TransportSessionController],
  providers: [TransportSessionService, PrismaService, CrudService],
  exports: [TransportSessionService],
})
export class TransportSessionModule {}
