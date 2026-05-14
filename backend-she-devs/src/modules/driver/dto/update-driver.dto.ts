import { PartialType } from '@nestjs/mapped-types';
import { CreateDriverUserDto } from './create-driver.dto';

export class UpdateDriverDto extends PartialType(CreateDriverUserDto) {}
