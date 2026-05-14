import {
  Controller,
  Get,
  Body,
  Post,
  Logger,
} from '@nestjs/common';

import { UserService } from './user.service';

import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@ApiTags('Users')
export class UserController {

  private logger = new Logger(UserController.name);

  constructor(private readonly usersService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Lister tous les utilisateurs' })

  @ApiResponse({
    status: 200,
    description: 'Liste des utilisateurs récupérée avec succès',
  })

  @ApiResponse({
    status: 500,
    description: 'Erreur serveur',
  })

  async getAllUsers() {
    try {
      this.logger.log('Fetching all users...');

      const result = await this.usersService.getAllUsers();

      this.logger.log('Users fetched successfully');

      return result;

    } catch (error) {

      this.logger.error('Error fetching users:', error);

      throw error;
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Créer un utilisateur',
    description:
      'Création d\'un nouvel utilisateur avec username, email et password',
  })

  @ApiBody({
    type: CreateUserDto,

    examples: {

      user: {
        summary: 'Exemple utilisateur',

        value: {
          user_name: 'jean.rakoto',
          email: 'jean@gmail.com',
          password: 'Jean123@',
        },
      },

      admin: {
        summary: 'Exemple administrateur',

        value: {
          user_name: 'admin.system',
          email: 'admin@gmail.com',
          password: 'Admin123@',
        },
      },
    },
  })

  @ApiResponse({
    status: 201,
    description: 'Utilisateur créé avec succès',

    schema: {
      example: {
        id_user: 1,
        user_name: 'jean.rakoto',
        email: 'jean@gmail.com',
        password: 'hashedPassword...',
      },
    },
  })

  @ApiResponse({
    status: 400,
    description: 'Validation échouée',

    schema: {
      example: {
        statusCode: 400,
        message: [
          'email must be an email',
          'password must be longer than or equal to 6 characters',
        ],
        error: 'Bad Request',
      },
    },
  })

  @ApiResponse({
    status: 409,
    description: 'Email déjà utilisé',

    schema: {
      example: {
        statusCode: 409,
        message: 'Email already exists',
        error: 'Conflict',
      },
    },
  })

  async createUser(
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.createUser(createUserDto);
  }
}