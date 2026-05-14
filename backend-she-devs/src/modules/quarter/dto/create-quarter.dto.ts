import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuarterDto {
  @ApiProperty({
    example: 'Quartier Central',
    description: 'Nom du quartier',
  })
  @IsNotEmpty({ message: 'quarter_name is required' })
  @IsString({ message: 'quarter_name must be a string' })
  quarter_name!: string;

  @ApiProperty({
    example: 1,
    description: 'ID de la localisation',
  })
  @IsNotEmpty({ message: 'id_localisation is required' })
  @IsNumber({}, { message: 'id_localisation must be a number' })
  id_localisation!: number;
}
