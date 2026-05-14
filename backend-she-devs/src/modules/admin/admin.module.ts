import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { DashboardBusController } from './dashboard/dashboard-bus.controller';
import { DashboardBusService } from './dashboard/dashboard-bus.service';

@Module({
  imports: [UserModule],
  controllers: [AdminController, DashboardBusController],
  providers: [AdminService, PrismaService, DashboardBusService],
  exports: [AdminService, DashboardBusService],
})
export class AdminModule {}
