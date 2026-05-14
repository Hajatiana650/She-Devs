import { Module } from '@nestjs/common';
import { QuarterService } from './quarter.service';
import { QuarterController } from './quarter.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrudService } from 'src/services/crud-service';

@Module({
  controllers: [QuarterController],
  providers: [QuarterService, PrismaService, CrudService],
  exports: [QuarterService],
})
export class QuarterModule {}
