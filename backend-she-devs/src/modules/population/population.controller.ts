import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Logger,
} from '@nestjs/common';
import { PopulationService } from './population.service';
import { CreatePopulationUserDto } from './dto/create-population.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@Controller('population')
@ApiTags('Population')
export class PopulationController {
  private logger = new Logger(PopulationController.name);

  constructor(private readonly populationService: PopulationService) {}

  @Post()
  @ApiOperation({
    summary: 'Créer une population',
    description: 'Créer une nouvelle population avec user associé',
  })
  @ApiBody({
    type: CreatePopulationUserDto,
    examples: {
      population: {
        summary: 'Exemple population',
        value: {
          user_name: 'population.user',
          email: 'population@gmail.com',
          password: 'PopPass123@',
          id_quarter: 1,
          id_localisation: 1,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Population créée avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Quartier ou localisation non trouvés',
  })
  @ApiResponse({
    status: 409,
    description: 'Email ou username déjà utilisés',
  })
  async create(@Body() createPopulationUserDto: CreatePopulationUserDto) {
    try {
      this.logger.log('Creating new population user...');
      const result = await this.populationService.createPopulationUser(
        createPopulationUserDto,
      );
      this.logger.log('Population created successfully');
      return result;
    } catch (error) {
      this.logger.error('Error creating population:', error);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les populations' })
  @ApiResponse({
    status: 200,
    description: 'Liste des populations récupérée avec succès',
  })
  async findAll() {
    try {
      this.logger.log('Fetching all populations...');
      const result = await this.populationService.findAll();
      this.logger.log('Populations fetched successfully');
      return result;
    } catch (error) {
      this.logger.error('Error fetching populations:', error);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une population par ID' })
  @ApiResponse({
    status: 200,
    description: 'Population récupérée avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Population non trouvée',
  })
  async findOne(@Param('id') id: string) {
    try {
      this.logger.log(`Fetching population with id ${id}...`);
      const result = await this.populationService.findOne(+id);
      this.logger.log('Population fetched successfully');
      return result;
    } catch (error) {
      this.logger.error(`Error fetching population with id ${id}:`, error);
      throw error;
    }
  }
}
