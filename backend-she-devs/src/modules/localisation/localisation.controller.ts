import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Logger,
} from '@nestjs/common';
import { LocalisationService } from './localisation.service';
import { CreateLocalisationDto, GetNearbyLocalisationDto } from './dto/create-localisation.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@Controller('localisation')
@ApiTags('Localisation')
export class LocalisationController {
  private logger = new Logger(LocalisationController.name);

  constructor(private readonly localisationService: LocalisationService) {}

  @Post()
  @ApiOperation({
    summary: 'Créer une localisation',
    description: 'Créer une nouvelle localisation avec coordonnées GPS',
  })
  @ApiBody({
    type: CreateLocalisationDto,
    examples: {
      localisation: {
        summary: 'Exemple localisation',
        value: {
          latitude: -21.4525,
          longitude: 47.0857,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Localisation créée avec succès',
  })
  async create(@Body() createLocalisationDto: CreateLocalisationDto) {
    try {
      this.logger.log('Creating new localisation...');
      const result = await this.localisationService.create(createLocalisationDto);
      this.logger.log('Localisation created successfully');
      return result;
    } catch (error) {
      this.logger.error('Error creating localisation:', error);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Récupérer une localisation par ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Localisation récupérée avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Localisation non trouvée',
  })
  async findOne(@Param('id') id: string) {
    try {
      this.logger.log(`Fetching localisation with id ${id}...`);
      const result = await this.localisationService.findOne(+id);
      this.logger.log('Localisation fetched successfully');
      return result;
    } catch (error) {
      this.logger.error(`Error fetching localisation with id ${id}:`, error);
      throw error;
    }
  }

}
