import { IsNotEmpty, IsEmail, MinLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePopulationUserDto {
  @ApiProperty({
    example: 'population.user',
    description: 'Nom d\'utilisateur unique',
  })
  @IsNotEmpty({ message: 'user_name is required' })
  user_name!: string;

  @ApiProperty({
    example: 'population@gmail.com',
    description: 'Email unique',
  })
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'email must be a valid email address' })
  email!: string;

  @ApiProperty({
    example: 'PopulationPass123@',
    description: 'Mot de passe (minimum 6 caractères)',
  })
  @IsNotEmpty({ message: 'password is required' })
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  password!: string;

  @ApiProperty({
    example: 1,
    description: 'ID du quartier',
  })
  @IsNotEmpty({ message: 'id_quarter is required' })
  @IsNumber({}, { message: 'id_quarter must be a number' })
  id_quarter!: number;

  @ApiProperty({
    example: 1,
    description: 'ID de la localisation',
  })
  @IsNotEmpty({ message: 'id_localisation is required' })
  @IsNumber({}, { message: 'id_localisation must be a number' })
  id_localisation!: number;
}
