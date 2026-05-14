import {
  Controller,
  Post,
  Body,
  Logger,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { CreateSearchDto } from './dto/create-search.dto';
import { SearchResponseDto } from './dto/search-response.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@Controller('search')
@ApiTags('Search')
export class SearchController {
  private logger = new Logger(SearchController.name);

  constructor(private readonly searchService: SearchService) {}

  @Post('routes')
  @ApiOperation({
    summary: 'Rechercher des trajets disponibles',
    description: 'Rechercher des bus disponibles entre deux arrêts ou sur une ligne spécifique',
  })
  @ApiBody({
    type: CreateSearchDto,
    examples: {
      byLine: {
        summary: 'Recherche par ligne',
        value: {
          id_line: 1,
          id_stop_arrivee: 5,
          direction: 'ALLER',
        },
      },
      byStopsAller: {
        summary: 'Recherche par arrêts - ALLER',
        value: {
          id_stop_depart: 1,
          id_stop_arrivee: 3,
          direction: 'ALLER',
        },
      },
      byStopsRetour: {
        summary: 'Recherche par arrêts - RETOUR',
        value: {
          id_stop_depart: 3,
          id_stop_arrivee: 1,
          direction: 'RETOUR',
        },
      },
      withPreferredTime: {
        summary: 'Recherche avec heure préférée',
        value: {
          id_stop_depart: 1,
          id_stop_arrivee: 5,
          direction: 'ALLER',
          preferredTime: '2026-05-14T10:30:00Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des trajets disponibles',
    type: [SearchResponseDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Paramètres de recherche invalides',
  })
  @ApiResponse({
    status: 404,
    description: 'Aucun trajet disponible',
  })
  async searchRoutes(@Body() searchDto: CreateSearchDto): Promise<any> {
    try {
      this.logger.log('Searching routes...');
      const results = await this.searchService.searchRoutes(searchDto);
      this.logger.log(`Found ${results.length} available routes`);
      return {
        statusCode: 200,
        message: `Found ${results.length} available route(s)`,
        data: results,
      };
    } catch (error) {
      this.logger.error('Error searching routes:', error);
      throw error;
    }
  }
}
