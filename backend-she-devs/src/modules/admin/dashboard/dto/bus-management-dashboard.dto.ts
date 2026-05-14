import { ApiProperty } from '@nestjs/swagger';

export class BusDetailsDto {
  @ApiProperty({
    example: 'FNR-1024',
    description: 'Matricule du bus',
  })
  matricule!: string;

  @ApiProperty({
    example: 'L1',
    description: 'Numéro de ligne',
  })
  ligne!: string;

  @ApiProperty({
    example: 'Rakoto Jean',
    description: 'Nom complet du chauffeur',
  })
  chauffeur!: string;

  @ApiProperty({
    example: 'APTE',
    description: 'Statut du bus: APTE ou INAPTE',
    enum: ['APTE', 'INAPTE'],
  })
  statut!: string;

  @ApiProperty({
    example: '12/03/2025',
    description: 'Date de la dernière visite (JJ/MM/YYYY)',
  })
  derniereVisite!: string;

  @ApiProperty({
    example: '12/09/2026',
    description: 'Date d\'expiration de la visite (JJ/MM/YYYY)',
  })
  expiration!: string;

  @ApiProperty({
    example: 1,
    description: 'ID du bus pour voir les détails',
  })
  idBus!: number;

  @ApiProperty({
    example: 120,
    description: 'Jours restants avant expiration',
  })
  joursRestants!: number;

  @ApiProperty({
    example: 95,
    description: 'Pourcentage de validité restante',
  })
  pourcentage!: number;
}

export class BusManagementDashboardDto {
  @ApiProperty({
    example: 1,
    description: 'Nombre de bus retirés de la circulation',
  })
  busRetires!: number;

  @ApiProperty({
    type: [BusDetailsDto],
    description: 'Liste des buses avec détails',
  })
  buses!: BusDetailsDto[];
}
