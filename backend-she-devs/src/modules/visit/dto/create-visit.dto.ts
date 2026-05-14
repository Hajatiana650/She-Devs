import { IsNotEmpty, IsNumber, IsEnum, IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum VisitTypeDto {
  TECHNICAL_VISIT = 'TECHNICAL_VISIT',
  INSURANCE = 'INSURANCE',
}

export enum VisitResultDto {
  APTE = 'APTE',
  INAPTE = 'INAPTE',
}

export class CreateVisitDto {
  @ApiProperty({
    example: 1,
    description: 'ID du bus',
  })
  @IsNotEmpty({ message: 'busId is required' })
  @IsNumber({}, { message: 'busId must be a number' })
  busId!: number;

  @ApiProperty({
    enum: VisitTypeDto,
    example: 'TECHNICAL_VISIT',
    description: 'Type de visite: TECHNICAL_VISIT ou INSURANCE',
  })
  @IsNotEmpty({ message: 'visitType is required' })
  @IsEnum(VisitTypeDto, { message: 'visitType must be TECHNICAL_VISIT or INSURANCE' })
  visitType!: VisitTypeDto;

  @ApiProperty({
    enum: VisitResultDto,
    example: 'APTE',
    description: 'Résultat de la visite: APTE ou INAPTE',
  })
  @IsNotEmpty({ message: 'result is required' })
  @IsEnum(VisitResultDto, { message: 'result must be APTE or INAPTE' })
  result!: VisitResultDto;

  @ApiProperty({
    example: '2026-05-14T10:30:00Z',
    description: 'Date de la visite (ISO 8601)',
  })
  @IsNotEmpty({ message: 'dateVisit is required' })
  @IsDateString({}, { message: 'dateVisit must be a valid ISO 8601 date' })
  dateVisit!: string;

  @ApiProperty({
    example: '2027-05-14T10:30:00Z',
    description: 'Date limite de la visite (ISO 8601)',
  })
  @IsNotEmpty({ message: 'dateLimit is required' })
  @IsDateString({}, { message: 'dateLimit must be a valid ISO 8601 date' })
  dateLimit!: string;

  @ApiProperty({
    example: 'Bus en bon état',
    description: 'Observations sur la visite (optionnel)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'observation must be a string' })
  observation?: string;

  @ApiProperty({
    example: 'https://example.com/attachment.pdf',
    description: 'URL ou chemin de la pièce jointe (optionnel)',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'attachment must be a string' })
  attachment?: string;
}
