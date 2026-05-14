import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshToken {
  @ApiProperty({ example: 'duzhfygcuytr' })
  @IsNotEmpty()
  refreshToken!: string;
}