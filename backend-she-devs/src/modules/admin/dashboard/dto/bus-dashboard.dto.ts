import { ApiProperty } from '@nestjs/swagger';

export class BusDashboardDto {
  @ApiProperty({
    example: 5,
    description: 'Nombre total de bus enregistrés',
  })
  busEnregistres: number;

  @ApiProperty({
    example: 4,
    description: 'Nombre de bus avec statut APTE (valides)',
  })
  busAptes: number;

  @ApiProperty({
    example: 1,
    description: 'Nombre de bus avec statut INAPTE (invalides)',
  })
  busInaptes: number;

  @ApiProperty({
    example: 4,
    description: 'Nombre de visites expirées ou expirant dans les 30 jours',
  })
  visitesARenouveler: number;
}
