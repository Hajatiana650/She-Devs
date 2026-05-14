import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Logger,
} from '@nestjs/common';
import { BusService } from './bus.service';
import { CreateBusDto } from './dto/create-bus.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@Controller('bus')
@ApiTags('Bus')
export class BusController {
  private logger = new Logger(BusController.name);

  constructor(private readonly busService: BusService) {}

  @Post()
  @ApiOperation({
    summary: 'Créer un bus',
    description: 'Créer un nouveau bus avec matricule, état et liaisons',
  })
  @ApiBody({
    type: CreateBusDto,
    examples: {
      bus: {
        summary: 'Exemple bus',
        value: {
          matricule: 'BUS-001',
          bus_status: true,
          id_line: 1,
          id_localisation: 1,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Bus créé avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Ligne ou localisation non trouvées',
  })
  @ApiResponse({
    status: 409,
    description: 'Matricule déjà utilisé',
  })
  async create(@Body() createBusDto: CreateBusDto) {
    try {
      this.logger.log('Creating new bus...');
      const data: any = {
        matricule: createBusDto.matricule,
        bus_status: createBusDto.bus_status,
        id_line: createBusDto.id_line,
        id_localisation: createBusDto.id_localisation,
      };
      const result = await this.busService.create(data);
      this.logger.log('Bus created successfully');
      return result;
    } catch (error) {
      this.logger.error('Error creating bus:', error);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les bus' })
  @ApiResponse({
    status: 200,
    description: 'Liste des bus récupérée avec succès',
  })
  async findAll() {
    try {
      this.logger.log('Fetching all buses...');
      const result = await this.busService.findAll();
      this.logger.log('Buses fetched successfully');
      return result;
    } catch (error) {
      this.logger.error('Error fetching buses:', error);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un bus par ID' })
  @ApiResponse({
    status: 200,
    description: 'Bus récupéré avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Bus non trouvé',
  })
  async findOne(@Param('id') id: string) {
    try {
      this.logger.log(`Fetching bus with id ${id}...`);
      const result = await this.busService.findOne(+id);
      this.logger.log('Bus fetched successfully');
      return result;
    } catch (error) {
      this.logger.error(`Error fetching bus with id ${id}:`, error);
      throw error;
    }
  }
}
