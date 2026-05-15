import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { CollectService } from './collect.service';

@Controller('collect')
export class CollectController {
  constructor(private collect: CollectService) {}

  @Get()
  findAll() {
    return this.collect.findAll();
  }

  @Post()
  create(@Body() dto: any) {
    return this.collect.create(dto);
  }
}