import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLineDto {
  @ApiProperty({
    example: 'Ligne 1',
    description: 'Numéro ou nom unique de la ligne',
  })
  @IsNotEmpty({ message: 'nb_line is required' })
  @IsString({ message: 'nb_line must be a string' })
  nb_line!: string;
}
