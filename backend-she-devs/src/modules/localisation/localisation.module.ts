import { Module } from '@nestjs/common';
import { LocalisationService } from './localisation.service';
import { LocalisationController } from './localisation.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrudService } from 'src/services/crud-service';

@Module({
  controllers: [LocalisationController],
  providers: [LocalisationService, PrismaService, CrudService],
  exports: [LocalisationService],
})
export class LocalisationModule {}
