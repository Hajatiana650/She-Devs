import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum DirectionEnum {
  ALLER = 'ALLER',
  RETOUR = 'RETOUR',
}

export class CreateStopDto {
  @ApiProperty({
    example: 1,
    description: 'Ordre/numéro du stop sur la ligne',
  })
  @IsNotEmpty({ message: 'order_stop is required' })
  @IsNumber({}, { message: 'order_stop must be a number' })
  order_stop!: number;

  @ApiProperty({
    example: 'Gare Centrale',
    description: 'Nom du stop',
  })
  @IsNotEmpty({ message: 'name_stop is required' })
  @IsString({ message: 'name_stop must be a string' })
  name_stop!: string;

  @ApiProperty({
    enum: DirectionEnum,
    example: 'ALLER',
    description: 'Direction: ALLER ou RETOUR',
    required: false,
  })
  @IsOptional()
  @IsEnum(DirectionEnum, { message: 'direction must be ALLER or RETOUR' })
  direction?: DirectionEnum;

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
