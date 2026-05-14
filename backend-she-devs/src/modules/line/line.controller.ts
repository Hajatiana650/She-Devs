import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Logger,
} from '@nestjs/common';
import { LineService } from './line.service';
import { CreateLineDto } from './dto/create-line.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@Controller('line')
@ApiTags('Line')
export class LineController {
  private logger = new Logger(LineController.name);

  constructor(private readonly lineService: LineService) {}

  @Post()
  @ApiOperation({
    summary: 'Créer une ligne',
    description: 'Créer une nouvelle ligne de transport',
  })
  @ApiBody({
    type: CreateLineDto,
    examples: {
      line: {
        summary: 'Exemple ligne',
        value: {
          nb_line: 'Ligne 1',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Ligne créée avec succès',
  })
  @ApiResponse({
    status: 409,
    description: 'Numéro de ligne déjà utilisé',
  })
  async create(@Body() createLineDto: CreateLineDto) {
    try {
      this.logger.log('Creating new line...');
      const data: any = {
        nb_line: createLineDto.nb_line,
      };
      const result = await this.lineService.create(data);
      this.logger.log('Line created successfully');
      return result;
    } catch (error) {
      this.logger.error('Error creating line:', error);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les lignes' })
  @ApiResponse({
    status: 200,
    description: 'Liste des lignes récupérée avec succès',
  })
  async findAll() {
    try {
      this.logger.log('Fetching all lines...');
      const result = await this.lineService.findAll();
      this.logger.log('Lines fetched successfully');
      return result;
    } catch (error) {
      this.logger.error('Error fetching lines:', error);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une ligne par ID' })
  @ApiResponse({
    status: 200,
    description: 'Ligne récupérée avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Ligne non trouvée',
  })
  async findOne(@Param('id') id: string) {
    try {
      this.logger.log(`Fetching line with id ${id}...`);
      const result = await this.lineService.findOne(+id);
      this.logger.log('Line fetched successfully');
      return result;
    } catch (error) {
      this.logger.error(`Error fetching line with id ${id}:`, error);
      throw error;
    }
  }
}
