import { Module } from '@nestjs/common';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrudService } from 'src/services/crud-service';

@Module({
  controllers: [VisitController],
  providers: [VisitService, PrismaService, CrudService],
  exports: [VisitService],
})
export class VisitModule {}
