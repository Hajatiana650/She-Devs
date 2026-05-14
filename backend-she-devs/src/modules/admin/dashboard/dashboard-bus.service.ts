import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BusDashboardDto } from './dto/bus-dashboard.dto';
import {
  BusManagementDashboardDto,
  BusDetailsDto,
} from './dto/bus-management-dashboard.dto';

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

  async getManagementBusDashboard(
    filter: 'all' | 'apte' | 'inapte' | 'expiring' = 'all',
  ): Promise<any> {
    try {
      // 1. Compter les bus retirés (INAPTES)
      const busRetires = await this.prisma.bus.count({
        where: { bus_status: false },
      });

      // 2. Récupérer tous les buses avec relations
      let whereClause: any = {};

      if (filter === 'apte') {
        whereClause.bus_status = true;
      } else if (filter === 'inapte') {
        whereClause.bus_status = false;
      }
      // Pour 'expiring', on filtrera après avoir les visites

      const buses = await this.prisma.bus.findMany({
        where: whereClause,
        include: {
          line: true,
          driver: {
            include: {
              user: true,
            },
          },
        },
      });

      // 3. Récupérer la dernière visite pour chaque bus et formatter
      const busDetailsPromises = buses.map(async (bus) => {
        const lastVisit = await this.prisma.visitInsurance.findFirst({
          where: { busId: bus.id_bus },
          orderBy: { dateVisit: 'desc' },
        });

        const dateVisit = lastVisit
          ? new Date(lastVisit.dateVisit)
          : new Date();
        const dateLimit = lastVisit ? new Date(lastVisit.dateLimit) : new Date();
        const today = new Date();

        // Format JJ/MM/YYYY
        const formatDate = (date: Date) => {
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        };

        const joursRestants = Math.ceil(
          (dateLimit.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
        );

        const totalDaysValidity = lastVisit
          ? Math.ceil(
              (dateLimit.getTime() - dateVisit.getTime()) /
                (1000 * 60 * 60 * 24),
            )
          : 365;

        const pourcentage = Math.max(
          0,
          Math.min(
            100,
            Math.round((joursRestants / totalDaysValidity) * 100),
          ),
        );

        return {
          matricule: bus.matricule,
          ligne: `L${bus.line.nb_line}`,
          chauffeur: bus.driver?.user?.user_name || 'N/A',
          statut: bus.bus_status ? 'APTE' : 'INAPTE',
          derniereVisite: lastVisit ? formatDate(dateVisit) : 'N/A',
          expiration: lastVisit ? formatDate(dateLimit) : 'N/A',
          idBus: bus.id_bus,
          joursRestants: lastVisit ? joursRestants : 0,
          pourcentage: lastVisit ? pourcentage : 0,
        } as BusDetailsDto;
      });

      let busDetails = await Promise.all(busDetailsPromises);

      // 4. Appliquer le filtre 'expiring' si nécessaire
      if (filter === 'expiring') {
        busDetails = busDetails.filter((bus) => bus.joursRestants <= 30);
      }

      const management: BusManagementDashboardDto = {
        busRetires,
        buses: busDetails,
      };

      return {
        statusCode: 200,
        message: 'Bus management dashboard retrieved successfully',
        data: management,
      };
    } catch (error) {
      this.logger.error('Error fetching bus management dashboard:', error);
      throw error;
    }
  }
}