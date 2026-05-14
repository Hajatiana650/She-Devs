import { IsNotEmpty, IsString, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBusDto {
  @ApiProperty({
    example: 'BUS-001',
    description: 'Matricule unique du bus',
  })
  @IsNotEmpty({ message: 'matricule is required' })
  @IsString({ message: 'matricule must be a string' })
  matricule!: string;

  @ApiProperty({
    example: true,
    description: 'État du bus (true = apte, false = inapte)',
  })
  @IsNotEmpty({ message: 'bus_status is required' })
  @IsBoolean({ message: 'bus_status must be a boolean' })
  bus_status!: boolean;

  @ApiProperty({
    example: 1,
    description: 'ID de la ligne',
  })
  @IsNotEmpty({ message: 'id_line is required' })
  @IsNumber({}, { message: 'id_line must be a number' })
  id_line!: number;

  @ApiProperty({
    example: 1,
    description: 'ID de la localisation',
  })
  @IsNotEmpty({ message: 'id_localisation is required' })
  @IsNumber({}, { message: 'id_localisation must be a number' })
  id_localisation!: number;
}
