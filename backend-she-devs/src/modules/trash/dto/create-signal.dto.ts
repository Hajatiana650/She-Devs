import { IsString, IsInt, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum PriorityEnum {
  HAUTE = 'HAUTE',
  NORMALE = 'NORMALE',
  BASSE = 'BASSE',
}

export enum SignalStatusEnum {
  EN_ATTENTE = 'EN_ATTENTE',
  PRIS_EN_COMPTE = 'PRIS_EN_COMPTE',
  TRAITÉ = 'TRAITÉ',
}

export class CreateSignalDto {
  @ApiProperty({ example: 'photo_url.jpg' })
  @IsOptional()
  @IsString({ message: 'photo must be a string' })
  photo?: string;

  @ApiProperty({ example: 'Dechets entassés au coin de la rue' })
  @IsOptional()
  @IsString({ message: 'description must be a string' })
  description?: string;

  @ApiProperty({ enum: PriorityEnum, example: 'NORMALE' })
  @IsOptional()
  @IsEnum(PriorityEnum)
  priority?: PriorityEnum = PriorityEnum.NORMALE;

  @ApiProperty({ enum: SignalStatusEnum, example: 'EN_ATTENTE' })
  @IsOptional()
  @IsEnum(SignalStatusEnum)
  status?: SignalStatusEnum = SignalStatusEnum.EN_ATTENTE;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'quarter_id is required' })
  @IsInt({ message: 'quarter_id must be an integer' })
  quarter_id!: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'user_id is required' })
  @IsInt({ message: 'user_id must be an integer' })
  user_id!: number;
}