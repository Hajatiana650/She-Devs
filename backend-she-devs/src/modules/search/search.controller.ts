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
      example1_lineOnly: {
        summary: '1️⃣ Cas 1: Recherche par LIGNE uniquement',
        description: 'Utilisateur connaît la ligne, cherche juste les bus disponibles sur une destination',
        value: {
          id_line: 1,
          id_stop_arrivee: 3,
          direction: 'ALLER',
        },
      },
      example2_stopsAller: {
        summary: '2️⃣ Cas 2: Recherche ALLER par arrêts de départ/arrivée',
        description: 'Utilisateur veut aller du point A au point B (matin)',
        value: {
          id_stop_depart: 1,
          id_stop_arrivee: 3,
          direction: 'ALLER',
        },
      },
      example3_stopsRetour: {
        summary: '3️⃣ Cas 3: Recherche RETOUR par arrêts de départ/arrivée',
        description: 'Utilisateur retourne du point B au point A (soir)',
        value: {
          id_stop_depart: 3,
          id_stop_arrivee: 1,
          direction: 'RETOUR',
        },
      },
      example4_withPreferredTime: {
        summary: '4️⃣ Cas 4: Recherche avec heure préférée',
        description: 'Utilisateur cherche un trajet spécifique à une heure précise',
        value: {
          id_stop_depart: 1,
          id_stop_arrivee: 3,
          direction: 'ALLER',
          preferredTime: '2026-05-14T10:30:00Z',
        },
      },
      example5_lineWithTime: {
        summary: '5️⃣ Cas 5: Recherche par ligne avec heure',
        description: 'Utilisateur connaît la ligne et cherche à une heure précise',
        value: {
          id_line: 1,
          id_stop_arrivee: 3,
          direction: 'ALLER',
          preferredTime: '2026-05-14T14:00:00Z',
        },
      },
      example6_stopDepartOnly: {
        summary: '6️⃣ Cas 6: Recherche avec arrêt de départ seulement',
        description: 'Utilisateur est à un arrêt spécifique et cherche où aller',
        value: {
          id_stop_depart: 2,
          id_stop_arrivee: 3,
          direction: 'ALLER',
        },
      },
      example7_defaultDirection: {
        summary: '7️⃣ Cas 7: Recherche sans direction explicite (défaut: ALLER)',
        description: 'Direction non spécifiée = ALLER par défaut',
        value: {
          id_stop_depart: 1,
          id_stop_arrivee: 3,
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
