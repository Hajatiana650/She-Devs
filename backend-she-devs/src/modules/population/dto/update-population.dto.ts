import { PartialType } from '@nestjs/mapped-types';
import { CreatePopulationUserDto } from './create-population.dto';

export class UpdatePopulationDto extends PartialType(CreatePopulationUserDto) {}
