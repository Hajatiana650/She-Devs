import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EndTransportSessionDto {
  @ApiProperty({
    example: 1,
    description: 'ID de la session à terminer',
  })
  @IsNotEmpty({ message: 'id_session is required' })
  @IsNumber({}, { message: 'id_session must be a number' })
  id_session!: number;
}
