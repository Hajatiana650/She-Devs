import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Logger,
  Query,
} from '@nestjs/common';
import { TransportSessionService } from './transport-session.service';
import { StartTransportSessionDto } from './dto/start-transport-session.dto';
import { EndTransportSessionDto } from './dto/end-transport-session.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@Controller('transport-session')
@ApiTags('Transport Session')
export class TransportSessionController {
  private logger = new Logger(TransportSessionController.name);

  constructor(private readonly sessionService: TransportSessionService) {}

  @Post('start')
  @ApiOperation({
    summary: 'Démarrer une session de transport',
    description: 'Démarre une nouvelle session de transport pour un bus',
  })
  @ApiBody({
    type: StartTransportSessionDto,
    examples: {
      aller: {
        summary: 'Démarrer session ALLER',
        value: {
          id_bus: 1,
          direction: 'ALLER',
        },
      },
      retour: {
        summary: 'Démarrer session RETOUR',
        value: {
          id_bus: 1,
          direction: 'RETOUR',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Session démarrée avec succès',
  })
  @ApiResponse({
    status: 400,
    description: 'Bus indisponible ou session déjà active',
  })
  @ApiResponse({
    status: 404,
    description: 'Bus non trouvé',
  })
  async startSession(@Body() dto: StartTransportSessionDto) {
    try {
      this.logger.log(`Starting transport session for bus ${dto.id_bus}...`);
      const result = await this.sessionService.startSession(dto);
      this.logger.log('Transport session started successfully');
      return result;
    } catch (error) {
      this.logger.error('Error starting transport session:', error);
      throw error;
    }
  }

  @Post('end')
  @ApiOperation({
    summary: 'Terminer une session de transport',
    description: 'Termine une session de transport existante',
  })
  @ApiBody({
    type: EndTransportSessionDto,
    examples: {
      end: {
        summary: 'Terminer session',
        value: {
          id_session: 1,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Session terminée avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Session non trouvée',
  })
  async endSession(@Body() dto: EndTransportSessionDto) {
    try {
      this.logger.log(`Ending transport session ${dto.id_session}...`);
      const result = await this.sessionService.endSession(dto);
      this.logger.log('Transport session ended successfully');
      return result;
    } catch (error) {
      this.logger.error('Error ending transport session:', error);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les sessions' })
  @ApiResponse({
    status: 200,
    description: 'Liste des sessions',
  })
  async findAll(
    @Query('status') status?: 'WAITING' | 'ACTIVE' | 'FINISHED' | 'CANCELLED',
  ) {
    try {
      this.logger.log('Fetching all sessions...');
      const result = await this.sessionService.findAll(status);
      this.logger.log('Sessions fetched successfully');
      return result;
    } catch (error) {
      this.logger.error('Error fetching sessions:', error);
      throw error;
    }
  }

  @Get('active')
  @ApiOperation({ summary: 'Lister les sessions actives' })
  @ApiResponse({
    status: 200,
    description: 'Liste des sessions actives',
  })
  async findActiveSessions() {
    try {
      this.logger.log('Fetching active sessions...');
      const result = await this.sessionService.findActiveSessions();
      this.logger.log('Active sessions fetched successfully');
      return result;
    } catch (error) {
      this.logger.error('Error fetching active sessions:', error);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une session par ID' })
  @ApiResponse({
    status: 200,
    description: 'Session récupérée',
  })
  @ApiResponse({
    status: 404,
    description: 'Session non trouvée',
  })
  async findOne(@Param('id') id: string) {
    try {
      this.logger.log(`Fetching session with id ${id}...`);
      const result = await this.sessionService.findOne(+id);
      this.logger.log('Session fetched successfully');
      return result;
    } catch (error) {
      this.logger.error(`Error fetching session with id ${id}:`, error);
      throw error;
    }
  }
}
