import { ApiProperty } from '@nestjs/swagger';

export class VisitDriverResponseDto {
  @ApiProperty({
    example: '12/03/2025',
    description: 'Date de la dernière visite (format JJ/MM/YYYY)',
  })
  lastVisitDate!: string;

  @ApiProperty({
    example: 'APTE',
    description: 'Statut du bus: APTE ou INAPTE',
    enum: ['APTE', 'INAPTE'],
  })
  status!: string;

  @ApiProperty({
    example: '12/09/2026',
    description: 'Date d\'expiration de l\'assurance (format JJ/MM/YYYY)',
  })
  expirationDate!: string;

  @ApiProperty({
    example: 'Expire dans 120 jours',
    description: 'Compte à rebours en jours',
  })
  countdown!: string;

  @ApiProperty({
    example: 95,
    description: 'Pourcentage de validité restante (0-100%)',
  })
  percentage!: number;

  @ApiProperty({
    example: 1,
    description: 'ID de la visite',
  })
  visitId!: number;

  @ApiProperty({
    example: 'INSURANCE',
    description: 'Type de visite',
  })
  visitType!: string;

  @ApiProperty({
    example: 'Bus en excellent état',
    description: 'Observation sur la visite',
    required: false,
  })
  observation?: string;
}
