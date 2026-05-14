import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { TrashService } from './trash.service';

@Controller('trash')
export class TrashController {
  constructor(private trash: TrashService) {}

  @Get('dashboard')
  dashboard() {
    return this.trash.dashboard();
  }

  @Get('signals')
  signals() {
    return this.trash.findSignals();
  }

  @Post('signal')
  create(@Body() dto: any) {
    return this.trash.createSignal(dto);
  }

  @Patch('validate/:id')
  validate(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.trash.validateSignal(id);
  }

  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.trash.deleteSignal(id);
  }
}