import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Logger,
} from '@nestjs/common';
import { VisitService } from './visit.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { VisitDriverResponseDto } from './dto/visit-driver-response.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@Controller('visit')
@ApiTags('Visit')
export class VisitController {
  private logger = new Logger(VisitController.name);

  constructor(private readonly visitService: VisitService) {}

  @Post()
  @ApiOperation({
    summary: 'Créer une visite',
    description: 'Créer une nouvelle visite (technique ou assurance) pour un bus',
  })
  @ApiBody({
    type: CreateVisitDto,
    examples: {
      visit: {
        summary: 'Exemple visite',
        value: {
          busId: 1,
          visitType: 'TECHNICAL_VISIT',
          result: 'APTE',
          dateVisit: '2026-05-14T10:30:00Z',
          dateLimit: '2027-05-14T10:30:00Z',
          observation: 'Bus en bon état',
          attachment: 'https://example.com/report.pdf',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Visite créée avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Bus non trouvé',
  })
  async create(@Body() createVisitDto: CreateVisitDto) {
    try {
      this.logger.log('Creating new visit...');
      const data: any = {
        busId: createVisitDto.busId,
        visitType: createVisitDto.visitType,
        result: createVisitDto.result,
        dateVisit: new Date(createVisitDto.dateVisit),
        dateLimit: new Date(createVisitDto.dateLimit),
        observation: createVisitDto.observation,
        attachment: createVisitDto.attachment,
      };
      const result = await this.visitService.create(data);
      this.logger.log('Visit created successfully');
      return result;
    } catch (error) {
      this.logger.error('Error creating visit:', error);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les visites' })
  @ApiResponse({
    status: 200,
    description: 'Liste des visites récupérée avec succès',
  })
  async findAll() {
    try {
      this.logger.log('Fetching all visits...');
      const result = await this.visitService.findAll();
      this.logger.log('Visits fetched successfully');
      return result;
    } catch (error) {
      this.logger.error('Error fetching visits:', error);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une visite par ID' })
  @ApiResponse({
    status: 200,
    description: 'Visite récupérée avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Visite non trouvée',
  })
  async findOne(@Param('id') id: string) {
    try {
      this.logger.log(`Fetching visit with id ${id}...`);
      const result = await this.visitService.findOne(+id);
      this.logger.log('Visit fetched successfully');
      return result;
    } catch (error) {
      this.logger.error(`Error fetching visit with id ${id}:`, error);
      throw error;
    }
  }

  @Get('driver/:idDriver')
  @ApiOperation({
    summary: 'Récupérer les visites d\'un chauffeur',
    description: 'Retourne la dernière visite (assurance ou technique) du chauffeur avec statut, dates et compte à rebours',
  })
  @ApiResponse({
    status: 200,
    description: 'Visites du chauffeur récupérées avec succès',
    type: VisitDriverResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Chauffeur ou visite non trouvé(e)',
  })
  async getVisitsByDriver(@Param('idDriver') idDriver: string) {
    try {
      this.logger.log(`Fetching visits for driver ${idDriver}...`);
      const result = await this.visitService.getVisitsByDriver(+idDriver);
      this.logger.log('Driver visits fetched successfully');
      return result;
    } catch (error) {
      this.logger.error(`Error fetching visits for driver ${idDriver}:`, error);
      throw error;
    }
  }
}
