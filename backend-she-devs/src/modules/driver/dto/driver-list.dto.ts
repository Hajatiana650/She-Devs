import { ApiProperty } from '@nestjs/swagger';

export class DriverListDto {
  @ApiProperty({
    example: 'Rakoto Jean',
    description: 'Nom complet du chauffeur',
  })
  nom: string;

  @ApiProperty({
    example: '+261 34 12 345 67',
    description: 'Numéro de téléphone du chauffeur',
  })
  telephone: string;

  @ApiProperty({
    example: 'FNR-1024',
    description: 'Matricule du bus assigné',
  })
  busAssigne: string;

  @ApiProperty({
    example: 'APTE',
    description: 'Statut du bus: APTE ou INAPTE',
    enum: ['APTE', 'INAPTE'],
  })
  statutBus: string;

  @ApiProperty({
    example: 1,
    description: 'ID du chauffeur',
  })
  idDriver: number;

  @ApiProperty({
    example: 1,
    description: 'ID du bus',
  })
  idBus: number;
}