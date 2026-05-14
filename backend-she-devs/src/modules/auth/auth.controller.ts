import { Body, Controller, Post, Logger } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RefreshToken } from './dto/refresh.dto';
import { AuthenticateDto } from '../user/dto/authenticate.dto';
import { Public } from './public.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Connexion utilisateur' })
  @ApiBody({
    type: AuthenticateDto,
    examples: {
      exemple: {
        summary: 'Connexion standard',
        value: { email: 'jean@gmail.com', password: 'Jean123@' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Retourne access_token et refresh_token',
    schema: {
      example: {
        access_token: 'eyJhbGci...',
        refresh_token: 'eyJhbGci...',
        user: { id: 'clx123', email: 'jean@gmail.com', name: 'Rakoto', role: 'USER' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Identifiants invalides' })
  async login(@Body() dto: AuthenticateDto) {
    try {
      this.logger.log(`Tentative de connexion: ${dto.email}`);
      return await this.authService.login(dto.email, dto.password);
    } catch (error) {
      this.logger.error('Erreur login:', error);
      throw error;
    }
  }

  @Post('refresh')
  @Public()
  @ApiOperation({ summary: 'Rafraîchir le token' })
  @ApiBody({ type: RefreshToken })
  @ApiResponse({ status: 200, description: 'Nouveau access_token' })
  @ApiResponse({ status: 401, description: 'Refresh token invalide' })
  async refresh(@Body() refreshToken: RefreshToken) {
    return this.authService.refresh(refreshToken);
  }
}