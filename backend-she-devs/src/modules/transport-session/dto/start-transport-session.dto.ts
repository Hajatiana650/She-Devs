import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum DirectionDto {
  ALLER = 'ALLER',
  RETOUR = 'RETOUR',
}

export class StartTransportSessionDto {
  @ApiProperty({
    example: 1,
    description: 'ID du bus',
  })
  @IsNotEmpty({ message: 'id_bus is required' })
  @IsNumber({}, { message: 'id_bus must be a number' })
  id_bus!: number;

  @ApiProperty({
    enum: DirectionDto,
    example: 'ALLER',
    description: 'Direction de la session: ALLER ou RETOUR',
  })
  @IsNotEmpty({ message: 'direction is required' })
  @IsEnum(DirectionDto, { message: 'direction must be ALLER or RETOUR' })
  direction!: DirectionDto;
}
