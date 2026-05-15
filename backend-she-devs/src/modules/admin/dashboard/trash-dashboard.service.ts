import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrashDashboardService {
  private logger = new Logger(TrashDashboardService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Récupérer les statistiques du dashboard déchets
   */
  async getDashboardStats() {
    try {
      const pendingSignals = await this.prisma.signal.count({
        where: { signal_status: false },
      });

      const treatedSignals = await this.prisma.signal.count({
        where: { signal_status: true },
      });

      const collects = await this.prisma.collect.count();

      const percentage = treatedSignals + pendingSignals > 0 
        ? Math.round((treatedSignals / (treatedSignals + pendingSignals)) * 100)
        : 0;

      return {
        statusCode: 200,
        message: 'Trash dashboard statistics retrieved successfully',
        data: {
          pendingSignals,
          treatedSignals,
          collects,
          treatmentRate: percentage,
        },
      };
    } catch (error) {
      this.logger.error('Error fetching trash dashboard:', error);
      throw error;
    }
  }

  /**
   * Récupérer les signalements
   */
  async getSignals(filter?: 'all' | 'pending' | 'treated') {
    try {
      let whereClause: any = {};

      if (filter === 'pending') {
        whereClause.signal_status = false;
      } else if (filter === 'treated') {
        whereClause.signal_status = true;
      }

      const signals = await this.prisma.signal.findMany({
        where: whereClause,
        include: {
          quarter: true,
          population: {
            include: {
              user: true,
            },
          },
        },
        orderBy: { id_signal: 'desc' },
      });

      const formatted = signals.map((s) => ({
        id: s.id_signal,
        photo: s.photo,
        description: s.description,
        statut: s.signal_status ? 'TRAITÉ' : 'EN_ATTENTE',
        quartier: s.quarter.quarter_name,
        utilisateur: s.population?.user?.user_name || 'N/A',
        date: new Date(s.id_signal).toLocaleDateString('fr-FR'),
      }));

      return {
        statusCode: 200,
        message: 'Signals retrieved successfully',
        data: { signals: formatted, total: formatted.length },
      };
    } catch (error) {
      this.logger.error('Error fetching signals:', error);
      throw error;
    }
  }

  /**
   * Récupérer les collectes
   */
  async getCollects(filter?: 'all' | 'scheduled' | 'planned') {
    try {
      const collects = await this.prisma.collect.findMany({
        include: {
          quarter: true,
        },
        orderBy: { date_collect: 'desc' },
      });

      const formatted = collects.map((c) => ({
        id: c.id_collect,
        quartier: c.quarter.quarter_name,
        date: new Date(c.date_collect).toLocaleDateString('fr-FR'),
        heure: new Date(c.date_collect).toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }));

      return {
        statusCode: 200,
        message: 'Collects retrieved successfully',
        data: { collects: formatted, total: formatted.length },
      };
    } catch (error) {
      this.logger.error('Error fetching collects:', error);
      throw error;
    }
  }

  /**
   * Mettre à jour le statut d'un signal
   */
  async updateSignalStatus(id: number, status: boolean) {
    try {
      const updated = await this.prisma.signal.update({
        where: { id_signal: id },
        data: { signal_status: status },
        include: {
          quarter: true,
          population: { include: { user: true } },
        },
      });

      return {
        statusCode: 200,
        message: 'Signal status updated successfully',
        data: {
          id: updated.id_signal,
          statut: updated.signal_status ? 'TRAITÉ' : 'EN_ATTENTE',
        },
      };
    } catch (error) {
      this.logger.error('Error updating signal:', error);
      throw error;
    }
  }

  /**
   * Créer une collecte
   */
  async createCollect(quarterId: number, dateCollect: string) {
    try {
      const collect = await this.prisma.collect.create({
        data: {
          id_quarter: quarterId,
          date_collect: new Date(dateCollect),
        },
        include: { quarter: true },
      });

      return {
        statusCode: 201,
        message: 'Collect created successfully',
        data: {
          id: collect.id_collect,
          quartier: collect.quarter.quarter_name,
          date: new Date(collect.date_collect).toLocaleDateString('fr-FR'),
        },
      };
    } catch (error) {
      this.logger.error('Error creating collect:', error);
      throw error;
    }
  }

  /**
   * Récupérer les signalements par quartier
   */
  async getSignalsByQuarter(quarterId: number) {
    try {
      const signals = await this.prisma.signal.findMany({
        where: { id_quarter: quarterId },
        include: {
          quarter: true,
          population: { include: { user: true } },
        },
        orderBy: { id_signal: 'desc' },
      });

      return {
        statusCode: 200,
        message: 'Signals by quarter retrieved',
        data: { signals: signals.length, details: signals },
      };
    } catch (error) {
      this.logger.error('Error fetching signals by quarter:', error);
      throw error;
    }
  }
}
