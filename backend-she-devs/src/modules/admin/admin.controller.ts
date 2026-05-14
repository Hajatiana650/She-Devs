import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Logger,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminUserDto } from './dto/create-admin.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@Controller('admin')
@ApiTags('Admin')
export class AdminController {
  private logger = new Logger(AdminController.name);

  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({
    summary: 'Créer un administrateur',
    description: 'Créer un nouvel administrateur avec user associé et rôle',
  })
  @ApiBody({
    type: CreateAdminUserDto,
    examples: {
      admin: {
        summary: 'Exemple administrateur bus',
        value: {
          user_name: 'admin.bus',
          email: 'admin.bus@gmail.com',
          password: 'AdminBus123@',
          rolee: 'BUS',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Admin créé avec succès',
  })
  @ApiResponse({
    status: 409,
    description: 'Email ou username déjà utilisés',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation échouée',
  })
  async create(@Body() createAdminUserDto: CreateAdminUserDto) {
    try {
      this.logger.log('Creating new admin user...');
      const result = await this.adminService.createAdminUser(createAdminUserDto);
      this.logger.log('Admin created successfully');
      return result;
    } catch (error) {
      this.logger.error('Error creating admin:', error);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les administrateurs' })
  @ApiResponse({
    status: 200,
    description: 'Liste des administrateurs récupérée avec succès',
  })
  async findAll() {
    try {
      this.logger.log('Fetching all admins...');
      const result = await this.adminService.findAll();
      this.logger.log('Admins fetched successfully');
      return result;
    } catch (error) {
      this.logger.error('Error fetching admins:', error);
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un administrateur par ID' })
  @ApiResponse({
    status: 200,
    description: 'Admin récupéré avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Admin non trouvé',
  })
  async findOne(@Param('id') id: string) {
    try {
      this.logger.log(`Fetching admin with id ${id}...`);
      const result = await this.adminService.findOne(+id);
      this.logger.log('Admin fetched successfully');
      return result;
    } catch (error) {
      this.logger.error(`Error fetching admin with id ${id}:`, error);
      throw error;
    }
  }
}
