import { IsNotEmpty, IsEmail, MinLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum RoleeEnum {
  BUS = 'BUS',
  TRASH = 'TRASH',
  OTHERS = 'OTHERS',
}

export class CreateAdminUserDto {
  @ApiProperty({
    example: 'admin.bus',
    description: 'Nom d\'utilisateur unique',
  })
  @IsNotEmpty({ message: 'user_name is required' })
  user_name!: string;

  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'Email unique',
  })
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'email must be a valid email address' })
  email!: string;

  @ApiProperty({
    example: 'AdminPassword123@',
    description: 'Mot de passe (minimum 6 caractères)',
  })
  @IsNotEmpty({ message: 'password is required' })
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  password!: string;

  @ApiProperty({
    example: 'BUS',
    enum: ['BUS', 'TRASH', 'OTHERS'],
    description: 'Rôle de l\'administrateur',
  })
  @IsNotEmpty({ message: 'rolee is required' })
  @IsEnum(RoleeEnum, { message: 'rolee must be one of: BUS, TRASH, OTHERS' })
  rolee!: string;
}
