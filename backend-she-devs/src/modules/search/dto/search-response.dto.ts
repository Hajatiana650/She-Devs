import { ApiProperty } from '@nestjs/swagger';

export class StopInfoDto {
  @ApiProperty({ example: 1, description: 'ID du stop' })
  id_stop!: number;

  @ApiProperty({ example: 'Ampasampito', description: 'Nom du stop' })
  name_stop!: string;

  @ApiProperty({ example: 1, description: 'Ordre du stop sur la ligne' })
  order_stop!: number;

  @ApiProperty({ example: 'ALLER', description: 'Direction: ALLER ou RETOUR' })
  direction!: string;

  @ApiProperty({ example: 200, description: 'Distance approximative en mètres' })
  distanceToStop?: number;

  @ApiProperty({ example: 1, description: 'Temps de marche estimé en minutes' })
  walkingTimeMinutes?: number;

  @ApiProperty({ example: -18.8792, description: 'Latitude' })
  latitude!: number;

  @ApiProperty({ example: 47.5079, description: 'Longitude' })
  longitude!: number;
}

export class LineInfoDto {
  @ApiProperty({ example: 1, description: 'ID de la ligne' })
  id_line!: number;

  @ApiProperty({ example: 'L01', description: 'Numéro de ligne' })
  nb_line!: string;

  @ApiProperty({ example: '#FF0000', description: 'Couleur de la ligne' })
  color?: string;
}

export class BusInfoDto {
  @ApiProperty({ example: 1, description: 'ID du bus' })
  id_bus!: number;

  @ApiProperty({ example: 'BUS-045', description: 'Matricule du bus' })
  matricule!: string;

  @ApiProperty({ example: true, description: 'Statut: true = apte, false = inapte' })
  bus_status!: boolean;

  @ApiProperty({ example: 60, description: 'Taux d\'occupation en %' })
  occupation!: number;

  @ApiProperty({ example: -18.8792, description: 'Latitude du bus' })
  latitude!: number;

  @ApiProperty({ example: 47.5079, description: 'Longitude du bus' })
  longitude!: number;
}

export class SearchResponseDto {
  @ApiProperty({ description: 'Informations de la ligne' })
  line!: LineInfoDto;

  @ApiProperty({ description: 'Informations du bus' })
  bus!: BusInfoDto;

  @ApiProperty({ example: 1, description: 'ID de la session de transport' })
  sessionId!: number;

  @ApiProperty({ example: 'ACTIVE', description: 'Statut de la session' })
  sessionStatus!: string;

  @ApiProperty({ description: 'Direction du trajet' })
  direction!: string;

  @ApiProperty({ description: 'Informations de l\'arrêt de départ' })
  departStop!: StopInfoDto;

  @ApiProperty({ description: 'Informations de l\'arrêt d\'arrivée' })
  arrivalStop!: StopInfoDto;

  @ApiProperty({ example: '2026-05-14T10:35:00Z', description: 'Heure estimée d\'arrivée du bus' })
  nextArrivalTime!: Date;

  @ApiProperty({ example: 5, description: 'Minutes avant l\'arrivée du bus' })
  minutesUntilArrival!: number;

  @ApiProperty({ example: 25, description: 'Durée estimée du trajet en minutes' })
  estimatedDuration!: number;

  @ApiProperty({ example: 5200, description: 'Distance totale du trajet en mètres' })
  totalDistance!: number;

  @ApiProperty({ example: 'EN SERVICE', description: 'Statut du bus' })
  status!: string;
}
