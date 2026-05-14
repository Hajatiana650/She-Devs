import { Module } from '@nestjs/common';
import { PopulationService } from './population.service';
import { PopulationController } from './population.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [PopulationController],
  providers: [PopulationService, PrismaService],
  exports: [PopulationService],
})
export class PopulationModule {}
