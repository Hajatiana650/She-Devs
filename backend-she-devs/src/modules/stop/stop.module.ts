import { Module } from '@nestjs/common';
import { StopService } from './stop.service';
import { StopController } from './stop.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrudService } from 'src/services/crud-service';

@Module({
  controllers: [StopController],
  providers: [StopService, PrismaService, CrudService],
  exports: [StopService],
})
export class StopModule {}
