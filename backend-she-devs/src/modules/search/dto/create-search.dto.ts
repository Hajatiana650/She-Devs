import { IsNotEmpty, IsNumber, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum DirectionDto {
  ALLER = 'ALLER',
  RETOUR = 'RETOUR',
}

export class CreateSearchDto {
  @ApiProperty({
    example: 1,
    description: 'ID de la ligne (ou laisser vide et utiliser id_stop_depart/id_stop_arrivee)',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'id_line must be a number' })
  id_line?: number;

  @ApiProperty({
    example: 1,
    description: 'ID de l\'arrêt de départ',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'id_stop_depart must be a number' })
  id_stop_depart?: number;

  @ApiProperty({
    example: 5,
    description: 'ID de l\'arrêt d\'arrivée',
  })
  @IsNotEmpty({ message: 'id_stop_arrivee is required' })
  @IsNumber({}, { message: 'id_stop_arrivee must be a number' })
  id_stop_arrivee!: number;

  @ApiProperty({
    enum: DirectionDto,
    example: 'ALLER',
    description: 'Direction: ALLER ou RETOUR (ALLER par défaut)',
    required: false,
  })
  @IsOptional()
  @IsEnum(DirectionDto, { message: 'direction must be ALLER or RETOUR' })
  direction?: DirectionDto;

  @ApiProperty({
    example: '2026-05-14T10:30:00Z',
    description: 'Heure d\'arrivée souhaitée (optionnel, ISO 8601)',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'preferredTime must be a valid ISO 8601 date' })
  preferredTime?: string;
}
