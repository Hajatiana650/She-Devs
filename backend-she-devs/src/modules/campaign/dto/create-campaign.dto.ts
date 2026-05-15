import { IsString, IsDateString, IsNotEmpty, IsOptional, IsInt, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCampaignDto {
  @ApiProperty({ example: 'Grand nettoyage du quartier' })
  @IsNotEmpty({ message: 'title is required' })
  @IsString({ message: 'title must be a string' })
  title!: string;

  @ApiProperty({ example: 'Détails de la campagne...', required: false })
  @IsOptional()
  @IsString({ message: 'message must be a string' })
  message?: string;

  @ApiProperty({ example: '2026-05-25T08:00:00Z' })
  @IsNotEmpty({ message: 'date_start is required' })
  @IsDateString({}, { message: 'date_start must be a valid date string' })
  date_start!: string;

  @ApiProperty({ example: '2026-05-25T18:00:00Z' })
  @IsNotEmpty({ message: 'date_end is required' })
  @IsDateString({}, { message: 'date_end must be a valid date string' })
  date_end!: string;

  @ApiProperty({ example: [1, 2, 3], description: 'Array of quarter IDs' })
  @IsNotEmpty({ message: 'quarter_ids is required' })
  @IsArray({ message: 'quarter_ids must be an array' })
  @IsInt({ each: true, message: 'each quarter_id must be an integer' })
  quarter_ids!: number[];
}