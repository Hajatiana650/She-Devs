import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BusDashboardDto } from './dto/bus-dashboard.dto';

@Injectable()
export class DashboardBusService {
  private logger = new Logger(DashboardBusService.name);

  constructor(private prisma: PrismaService) {}

  async getBusDashboard(): Promise<any> {
    try {
      // 1. Bus enregistrés (total)
      const busEnregistres = await this.prisma.bus.count();

      // 2. Bus APTES (bus_status = true)
      const busAptes = await this.prisma.bus.count({
        where: { bus_status: true },
      });

      // 3. Bus INAPTES (bus_status = false)
      const busInaptes = await this.prisma.bus.count({
        where: { bus_status: false },
      });

      // 4. Visites à renouveler (expirées ou expirant dans 30 jours)
      const today = new Date();
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

      const visitesARenouveler = await this.prisma.visitInsurance.count({
        where: {
          dateLimit: {
            lte: thirtyDaysFromNow,
          },
        },
      });

      const dashboard: BusDashboardDto = {
        busEnregistres,
        busAptes,
        busInaptes,
        visitesARenouveler,
      };

      return {
        statusCode: 200,
        message: 'Bus dashboard statistics retrieved successfully',
        data: dashboard,
      };
    } catch (error) {
      this.logger.error('Error fetching bus dashboard:', error);
      throw error;
    }
  }
}
