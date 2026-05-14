import { Module } from '@nestjs/common';
import { LineService } from './line.service';
import { LineController } from './line.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrudService } from 'src/services/crud-service';

@Module({
  controllers: [LineController],
  providers: [LineService, PrismaService, CrudService],
  exports: [LineService],
})
export class LineModule {}
