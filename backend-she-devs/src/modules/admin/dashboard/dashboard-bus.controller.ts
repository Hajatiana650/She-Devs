import { Controller, Get, Logger } from '@nestjs/common';
import { DashboardBusService } from './dashboard-bus.service';
import { BusDashboardDto } from './dto/bus-dashboard.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
}
