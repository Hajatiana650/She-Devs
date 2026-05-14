import { IsNotEmpty, IsNumber, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum DirectionDto {
  ALLER = 'ALLER',
  RETOUR = 'RETOUR',
}

export class CreateSearchDto {
  @ApiProperty({
    example: 1,
    description: 'ID de la ligne (Cas 1 & 5). Optionnel si id_stop_depart+id_stop_arrivee fournis.',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'id_line must be a number' })
  id_line?: number;

  @ApiProperty({
    example: 1,
    description: 'ID arrêt départ (Cas 2, 3, 6, 7). Optionnel si id_line fourni. Pour ALLER: order_stop(départ) < order_stop(arrivée). Pour RETOUR: order_stop(départ) > order_stop(arrivée).',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'id_stop_depart must be a number' })
  id_stop_depart?: number;

  @ApiProperty({
    example: 3,
    description: 'ID arrêt arrivée (REQUIS dans tous les cas). Doit être sur la même ligne que id_stop_depart s\'il est fourni.',
    required: true,
  })
  @IsNotEmpty({ message: 'id_stop_arrivee is required' })
  @IsNumber({}, { message: 'id_stop_arrivee must be a number' })
  id_stop_arrivee!: number;

  @ApiProperty({
    enum: DirectionDto,
    example: 'ALLER',
    description: 'ALLER (matin, défaut) ou RETOUR (soir). Optionnel, devient ALLER par défaut (Cas 7).',
    required: false,
  })
  @IsOptional()
  @IsEnum(DirectionDto, { message: 'direction must be ALLER or RETOUR' })
  direction?: DirectionDto;

  @ApiProperty({
    example: '2026-05-14T10:30:00Z',
    description: 'Heure ISO 8601 souhaitée (Cas 4 & 5). Optionnel. Format: "2026-05-14T10:30:00Z".',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'preferredTime must be a valid ISO 8601 date' })
  preferredTime?: string;
}
