import { Controller, Get, Logger, Query } from '@nestjs/common';
import { DashboardBusService } from './dashboard-bus.service';
import { BusDashboardDto } from './dto/bus-dashboard.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';

@Controller('admin/dashboard/bus')
@ApiTags('Admin - Dashboard Bus')
export class DashboardBusController {
  private logger = new Logger(DashboardBusController.name);

  constructor(private readonly dashboardBusService: DashboardBusService) {}

  @Get()
  @ApiOperation({
    summary: 'Récupérer le tableau de bord bus',
    description: 'Retourne les statistiques de tous les bus enregistrés',
  })
  @ApiResponse({
    status: 200,
    description: 'Tableau de bord bus récupéré avec succès',
    schema: {
      example: {
        statusCode: 200,
        message: 'Bus dashboard statistics retrieved successfully',
        data: {
          busEnregistres: 5,
          busAptes: 4,
          busInaptes: 1,
          visitesARenouveler: 4,
        },
      },
    },
  })
  async getBusDashboard() {
    try {
      this.logger.log('Fetching bus dashboard statistics...');
      const result = await this.dashboardBusService.getBusDashboard();
      this.logger.log('Bus dashboard retrieved successfully');
      return result;
    } catch (error) {
      this.logger.error('Error fetching bus dashboard:', error);
      throw error;
    }
  }

  @Get('management')
  @ApiOperation({
    summary: 'Gestion des buses avec détails',
    description: 'Retourne la liste des buses avec matricule, ligne, chauffeur, statut et visites',
  })
  @ApiQuery({
    name: 'filter',
    enum: ['all', 'apte', 'inapte', 'expiring'],
    required: false,
    description:
      'Filtrer les buses: all (tous), apte (APTES), inapte (INAPTES), expiring (expiration dans 30j)',
  })
  @ApiResponse({
    status: 200,
    description: 'Gestion buses récupérée avec succès',
    schema: {
      example: {
        statusCode: 200,
        message: 'Bus management dashboard retrieved successfully',
        data: {
          busRetires: 1,
          buses: [
            {
              matricule: 'FNR-1024',
              ligne: 'L1',
              chauffeur: 'Rakoto Jean',
              statut: 'APTE',
              derniereVisite: '12/03/2025',
              expiration: '12/09/2026',
              idBus: 1,
              joursRestants: 120,
              pourcentage: 95,
            },
          ],
        },
      },
    },
  })
  async getManagementBusDashboard(
    @Query('filter') filter: 'all' | 'apte' | 'inapte' | 'expiring' = 'all',
  ) {
    try {
      this.logger.log(`Fetching bus management dashboard with filter: ${filter}`);
      const result = await this.dashboardBusService.getManagementBusDashboard(
        filter,
      );
      this.logger.log('Bus management dashboard retrieved successfully');
      return result;
    } catch (error) {
      this.logger.error('Error fetching bus management dashboard:', error);
      throw error;
    }
  }
}
