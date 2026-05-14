import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Logger,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverUserDto } from './dto/create-driver.dto';
import { DriverListDto } from './dto/driver-list.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@Controller('driver')
@ApiTags('Driver')
export class DriverController {
  private logger = new Logger(DriverController.name);

  constructor(private readonly driverService: DriverService) {}

  @Post()
  @ApiOperation({
    summary: 'Créer un chauffeur',
    description: 'Créer un nouveau chauffeur avec user associé',
  })
  @ApiBody({
    type: CreateDriverUserDto,
    examples: {
      driver: {
        summary: 'Exemple chauffeur',
        value: {
          user_name: 'driver.bus01',
          email: 'driver@gmail.com',
          password: 'DriverPass123@',
          id_bus: 1,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Chauffeur créé avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Bus non trouvé',
  })
  @ApiResponse({
    status: 409,
    description: 'Email ou username déjà utilisés',
  })
  async create(@Body() createDriverUserDto: CreateDriverUserDto) {
    try {
      this.logger.log('Creating new driver user...');
      const result = await this.driverService.createDriverUser(
        createDriverUserDto,
      );
      this.logger.log('Driver created successfully');
      return result;
    } catch (error) {
      this.logger.error('Error creating driver:', error);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les chauffeurs' })
  @ApiResponse({
    status: 200,
    description: 'Liste des chauffeurs récupérée avec succès',
  })
  async findAll() {
    try {
      this.logger.log('Fetching all drivers...');
      const result = await this.driverService.findAll();
      this.logger.log('Drivers fetched successfully');
      return result;
    } catch (error) {
      this.logger.error('Error fetching drivers:', error);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un chauffeur par ID' })
  @ApiResponse({
    status: 200,
    description: 'Chauffeur récupéré avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Chauffeur non trouvé',
  })
  async findOne(@Param('id') id: string) {
    try {
      this.logger.log(`Fetching driver with id ${id}...`);
      const result = await this.driverService.findOne(+id);
      this.logger.log('Driver fetched successfully');
      return result;
    } catch (error) {
      this.logger.error(`Error fetching driver with id ${id}:`, error);
      throw error;
    }
  }

  @Get('list/drivers')
  @ApiOperation({
    summary: 'Lister les chauffeurs avec détails',
    description: 'Retourne la liste des chauffeurs avec nom, téléphone, bus assigné et statut du bus',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des chauffeurs récupérée avec succès',
    schema: {
      example: {
        statusCode: 200,
        message: 'Driver list retrieved successfully',
        data: [
          {
            nom: 'Rakoto Jean',
            telephone: '+261 34 12 345 67',
            busAssigne: 'FNR-1024',
            statutBus: 'APTE',
            idDriver: 1,
            idBus: 1,
          },
          {
            nom: 'Rabe Hery',
            telephone: '+261 34 12 345 68',
            busAssigne: 'FNR-1108',
            statutBus: 'APTE',
            idDriver: 2,
            idBus: 2,
          },
        ],
      },
    },
  })
  async getDriverList() {
    try {
      this.logger.log('Fetching driver list...');
      const result = await this.driverService.getDriverList();
      this.logger.log('Driver list fetched successfully');
      return result;
    } catch (error) {
      this.logger.error('Error fetching driver list:', error);
      throw error;
    }
  }
}
