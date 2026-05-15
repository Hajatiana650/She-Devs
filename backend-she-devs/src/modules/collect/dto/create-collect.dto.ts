import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum CollectStatusEnum {
  PLANIFIÉE = 'PLANIFIÉE',
  EFFECTUÉE = 'EFFECTUÉE',
  EN_RETARD = 'EN_RETARD',
}

export class CreateCollectDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'quarter_id is required' })
  @IsInt({ message: 'quarter_id must be an integer' })
  quarter_id!: number;

  @ApiProperty({ example: '2026-05-15T10:00:00Z' })
  @IsNotEmpty({ message: 'date_collect is required' })
  @IsDateString({}, { message: 'date_collect must be a valid date string' })
  date_collect!: string;

  @ApiProperty({ enum: CollectStatusEnum, example: 'PLANIFIÉE' })
  @IsOptional()
  @IsEnum(CollectStatusEnum)
  status?: CollectStatusEnum = CollectStatusEnum.PLANIFIÉE;

  @ApiProperty({ example: 150.5, required: false })
  @IsOptional()
  @IsNumber()
  amount?: number;
}