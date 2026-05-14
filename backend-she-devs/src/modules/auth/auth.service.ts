import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RefreshToken } from './dto/refresh.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Identifiants invalides');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Identifiants invalides');

    const payload = { sub: user.id_user, email: user.email, user_name: user.user_name };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '24h',
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.SECRET_KEY,
      }),
      user: {
        id_user: user.id_user,
        email: user.email,
        user_name: user.user_name,
      },
    };
  }

  async refresh(refreshToken: RefreshToken) {
    try {
      const payload = await this.jwtService.verifyAsync(
        refreshToken.refreshToken,
        { secret: process.env.SECRET_KEY },
      );

      const newPayload = {
        sub: payload.sub,
        email: payload.email,
        user_name: payload.user_name,
      };

      return {
        access_token: await this.jwtService.signAsync(newPayload, {
          expiresIn: '24h',
        }),
      };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}