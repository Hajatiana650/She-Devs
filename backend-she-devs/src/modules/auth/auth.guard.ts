import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();

    // Extraire le token du header Authorization
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token manquant');
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY,
      });
      // Injecter l'user dans la request pour les contrôleurs
      request['user'] = {
    id: payload.sub,
    email: payload.email,
    role: payload.role,
  };
    } catch {
      throw new UnauthorizedException('Token invalide ou expiré');
    }

    const user = request['user'];
    if (!user) throw new ForbiddenException('Utilisateur non trouvé');

    // Ton schéma a un enum Role (USER | ADMIN), pas une table relationnelle
    const isAdmin = user.role === 'ADMIN';
    if (isAdmin) return true;

    // Vérification de permission optionnelle (pour évolution future)
    const permission = this.reflector.getAllAndOverride<string>('permission', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!permission) return true;

    // Ton schéma n'a pas de table Permission pour l'instant
    // Ce bloc est prêt pour une future extension
    return false;
  }
}