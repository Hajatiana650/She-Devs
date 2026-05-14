// src/modules/stats/stats.controller.ts
import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly service: StatsService) {}

  @Get('signals-by-quarter')
  async getSignalsByQuarter() {
    return this.service.getSignalsByQuarter();
  }

  @Get('collects-by-month')
  async getCollectsByMonth() {
    return this.service.getCollectsByMonth();
  }

  @Get('treatment-rate')
  async getTreatmentRate() {
    return this.service.getTreatmentRate();
  }

  @Get('overview')
  async getOverview() {
    return this.service.getOverview();
  }
}