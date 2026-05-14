import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [DriverController],
  providers: [DriverService, PrismaService],
  exports: [DriverService],
})
export class DriverModule {}
