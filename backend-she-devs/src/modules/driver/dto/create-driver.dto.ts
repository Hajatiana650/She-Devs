import { IsNotEmpty, IsEmail, MinLength, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDriverUserDto {
  @ApiProperty({
    example: 'driver.bus01',
    description: 'Nom d\'utilisateur unique',
  })
  @IsNotEmpty({ message: 'user_name is required' })
  user_name!: string;

  @ApiProperty({
    example: 'driver@gmail.com',
    description: 'Email unique',
  })
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'email must be a valid email address' })
  email!: string;

  @ApiProperty({
    example: 'DriverPass123@',
    description: 'Mot de passe (minimum 6 caractères)',
  })
  @IsNotEmpty({ message: 'password is required' })
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  password!: string;

  @ApiProperty({
    example: 1,
    description: 'ID du bus',
  })
  @IsNotEmpty({ message: 'id_bus is required' })
  @IsNumber({}, { message: 'id_bus must be a number' })
  id_bus!: number;
}
