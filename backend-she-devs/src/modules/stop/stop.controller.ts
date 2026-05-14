import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Logger,
} from '@nestjs/common';
import { StopService } from './stop.service';
import { CreateStopDto } from './dto/create-stop.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@Controller('stop')
@ApiTags('Stop')
export class StopController {
  private logger = new Logger(StopController.name);

  constructor(private readonly stopService: StopService) {}

  @Post()
  @ApiOperation({
    summary: 'Créer un arrêt',
    description: 'Créer un nouvel arrêt sur une ligne avec localisation',
  })
  @ApiBody({
    type: CreateStopDto,
    examples: {
      stop: {
        summary: 'Exemple arrêt',
        value: {
          order_stop: 1,
          name_stop: 'Gare Centrale',
          id_line: 1,
          id_localisation: 1,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Arrêt créé avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Ligne ou localisation non trouvées',
  })
  @ApiResponse({
    status: 409,
    description: 'Nom d\'arrêt déjà utilisé',
  })
  async create(@Body() createStopDto: CreateStopDto) {
    try {
      this.logger.log('Creating new stop...');
      const data: any = {
        order_stop: createStopDto.order_stop,
        name_stop: createStopDto.name_stop,
        id_line: createStopDto.id_line,
        id_localisation: createStopDto.id_localisation,
      };
      const result = await this.stopService.create(data);
      this.logger.log('Stop created successfully');
      return result;
    } catch (error) {
      this.logger.error('Error creating stop:', error);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les arrêts' })
  @ApiResponse({
    status: 200,
    description: 'Liste des arrêts récupérée avec succès',
  })
  async findAll() {
    try {
      this.logger.log('Fetching all stops...');
      const result = await this.stopService.findAll();
      this.logger.log('Stops fetched successfully');
      return result;
    } catch (error) {
      this.logger.error('Error fetching stops:', error);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un arrêt par ID' })
  @ApiResponse({
    status: 200,
    description: 'Arrêt récupéré avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Arrêt non trouvé',
  })
  async findOne(@Param('id') id: string) {
    try {
      this.logger.log(`Fetching stop with id ${id}...`);
      const result = await this.stopService.findOne(+id);
      this.logger.log('Stop fetched successfully');
      return result;
    } catch (error) {
      this.logger.error(`Error fetching stop with id ${id}:`, error);
      throw error;
    }
  }
}
