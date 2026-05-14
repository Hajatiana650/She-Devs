import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Logger,
} from '@nestjs/common';
import { QuarterService } from './quarter.service';
import { CreateQuarterDto } from './dto/create-quarter.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@Controller('quarter')
@ApiTags('Quarter')
export class QuarterController {
  private logger = new Logger(QuarterController.name);

  constructor(private readonly quarterService: QuarterService) {}

  @Post()
  @ApiOperation({
    summary: 'Créer un quartier',
    description: 'Créer un nouveau quartier lié à une localisation',
  })
  @ApiBody({
    type: CreateQuarterDto,
    examples: {
      quarter: {
        summary: 'Exemple quartier',
        value: {
          quarter_name: 'Quartier Central',
          id_localisation: 1,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Quartier créé avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Localisation non trouvée',
  })
  async create(@Body() createQuarterDto: CreateQuarterDto) {
    try {
      this.logger.log('Creating new quarter...');
      const data: any = {
        quarter_name: createQuarterDto.quarter_name,
        id_localisation: createQuarterDto.id_localisation,
      };
      const result = await this.quarterService.create(data);
      this.logger.log('Quarter created successfully');
      return result;
    } catch (error) {
      this.logger.error('Error creating quarter:', error);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les quartiers' })
  @ApiResponse({
    status: 200,
    description: 'Liste des quartiers récupérée avec succès',
  })
  @ApiResponse({
    status: 500,
    description: 'Erreur serveur',
  })
  async findAll() {
    try {
      this.logger.log('Fetching all quarters...');
      const result = await this.quarterService.findAll();
      this.logger.log('Quarters fetched successfully');
      return result;
    } catch (error) {
      this.logger.error('Error fetching quarters:', error);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un quartier par ID' })
  @ApiResponse({
    status: 200,
    description: 'Quartier récupéré avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Quartier non trouvé',
  })
  async findOne(@Param('id') id: string) {
    try {
      this.logger.log(`Fetching quarter with id ${id}...`);
      const result = await this.quarterService.findOne(+id);
      this.logger.log('Quarter fetched successfully');
      return result;
    } catch (error) {
      this.logger.error(`Error fetching quarter with id ${id}:`, error);
      throw error;
    }
  }
}
