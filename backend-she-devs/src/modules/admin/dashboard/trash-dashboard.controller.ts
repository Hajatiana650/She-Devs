import { Controller, Get, Post, Patch, Query, Body, Param, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { TrashDashboardService } from './trash-dashboard.service';

@Controller('admin/dashboard/trash')
@ApiTags('Admin - Dashboard Déchets')
export class TrashDashboardController {
  private logger = new Logger(TrashDashboardController.name);

  constructor(private readonly trashDashboardService: TrashDashboardService) {}

  /**
   * Récupérer les statistiques du dashboard
   */
  @Get('stats')
  @ApiOperation({
    summary: 'Statistiques dashboard déchets',
    description: 'Retourne les statistiques: signalements, collectes, taux de traitement',
  })
  @ApiResponse({
    status: 200,
    description: 'Statistiques récupérées',
    schema: {
      example: {
        statusCode: 200,
        message: 'Trash dashboard statistics retrieved successfully',
        data: {
          pendingSignals: 5,
          treatedSignals: 12,
          collects: 3,
          treatmentRate: 70,
        },
      },
    },
  })
  async getStats() {
    try {
      return await this.trashDashboardService.getDashboardStats();
    } catch (error) {
      this.logger.error('Error fetching trash stats:', error);
      throw error;
    }
  }

  /**
   * Récupérer les signalements
   */
  @Get('signals')
  @ApiOperation({
    summary: 'Récupérer les signalements',
    description: 'Retourne la liste des signalements avec filtres',
  })
  @ApiQuery({
    name: 'filter',
    enum: ['all', 'pending', 'treated'],
    required: false,
  })
  async getSignals(@Query('filter') filter?: 'all' | 'pending' | 'treated') {
    try {
      return await this.trashDashboardService.getSignals(filter);
    } catch (error) {
      this.logger.error('Error fetching signals:', error);
      throw error;
    }
  }

  /**
   * Récupérer les collectes
   */
  @Get('collects')
  @ApiOperation({
    summary: 'Récupérer les collectes programmées',
    description: 'Retourne la liste des collectes de déchets',
  })
  @ApiQuery({
    name: 'filter',
    enum: ['all', 'scheduled', 'planned'],
    required: false,
  })
  async getCollects(@Query('filter') filter?: 'all' | 'scheduled' | 'planned') {
    try {
      return await this.trashDashboardService.getCollects(filter);
    } catch (error) {
      this.logger.error('Error fetching collects:', error);
      throw error;
    }
  }

  /**
   * Mettre à jour le statut d'un signal
   */
  @Patch('signals/:id/status')
  @ApiOperation({
    summary: 'Mettre à jour le statut d\'un signal',
    description: 'Marquer un signalement comme traité ou en attente',
  })
  async updateSignalStatus(
    @Param('id') id: string,
    @Body() body: { treated: boolean },
  ) {
    try {
      return await this.trashDashboardService.updateSignalStatus(
        parseInt(id),
        body.treated,
      );
    } catch (error) {
      this.logger.error('Error updating signal:', error);
      throw error;
    }
  }

  /**
   * Créer une collecte
   */
  @Post('collects')
  @ApiOperation({
    summary: 'Créer une collecte',
    description: 'Programmer une nouvelle collecte de déchets',
  })
  async createCollect(
    @Body() body: { quarterId: number; dateCollect: string },
  ) {
    try {
      return await this.trashDashboardService.createCollect(
        body.quarterId,
        body.dateCollect,
      );
    } catch (error) {
      this.logger.error('Error creating collect:', error);
      throw error;
    }
  }

  /**
   * Récupérer les signalements par quartier
   */
  @Get('signals/quarter/:quarterId')
  @ApiOperation({
    summary: 'Signalements d\'un quartier',
    description: 'Retourne tous les signalements d\'un quartier spécifique',
  })
  async getSignalsByQuarter(@Param('quarterId') quarterId: string) {
    try {
      return await this.trashDashboardService.getSignalsByQuarter(
        parseInt(quarterId),
      );
    } catch (error) {
      this.logger.error('Error fetching signals by quarter:', error);
      throw error;
    }
  }
}
