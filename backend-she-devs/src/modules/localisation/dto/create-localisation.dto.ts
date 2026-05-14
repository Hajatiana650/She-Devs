import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

export class CreateLocalisationDto {
  @ApiProperty({
    example: -21.4525,
    description: 'Latitude GPS',
  })
  @IsLatitude()
  @IsNotEmpty()
  latitude!: number;

  @ApiProperty({
    example: 47.0857,
    description: 'Longitude GPS',
  })
  @IsLongitude()
  @IsNotEmpty()
  longitude!: number;
}

export class GetNearbyLocalisationDto {
  @ApiProperty({
    example: -21.4525,
    description: 'Latitude GPS du point de référence',
  })
  @IsLatitude()
  @IsNotEmpty()
  latitude!: number;

  @ApiProperty({
    example: 47.0857,
    description: 'Longitude GPS du point de référence',
  })
  @IsLongitude()
  @IsNotEmpty()
  longitude!: number;

  @ApiProperty({
    example: 5,
    description: 'Distance en kilomètres',
  })
  @IsNotEmpty()
  distanceKm!: number;
}