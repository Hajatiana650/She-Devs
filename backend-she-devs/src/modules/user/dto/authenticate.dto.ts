import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthenticateDto {
  @ApiProperty({ example: 'jean@gmail.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'Jean123@' })
  @IsString()
  @MinLength(6)
  password!: string;

}