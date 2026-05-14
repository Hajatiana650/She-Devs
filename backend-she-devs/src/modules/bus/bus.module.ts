import { Module } from '@nestjs/common';
import { BusService } from './bus.service';
import { BusController } from './bus.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrudService } from 'src/services/crud-service';

@Module({
  controllers: [BusController],
  providers: [BusService, PrismaService, CrudService],
  exports: [BusService],
})
export class BusModule {}
