import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { DashboardBusController } from './dashboard/dashboard-bus.controller';
import { DashboardBusService } from './dashboard/dashboard-bus.service';
import { TrashDashboardController } from './dashboard/trash-dashboard.controller';
import { TrashDashboardService } from './dashboard/trash-dashboard.service';

@Module({
  imports: [UserModule],
  controllers: [AdminController, DashboardBusController, TrashDashboardController],
  providers: [AdminService, PrismaService, DashboardBusService, TrashDashboardService],
  exports: [AdminService, DashboardBusService, TrashDashboardService],
})
export class AdminModule {}
