// src/modules/stats/stats.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSignalsByQuarter() {
    // Utiliser Prisma au lieu de SQL brut
    return this.prisma.signal.groupBy({
      by: ['id_quarter'],
      _count: true,
    });
  }

  async getCollectsByMonth() {
    const collects = await this.prisma.collect.findMany({
      orderBy: { date_collect: 'desc' },
    });
    return collects;
  }

  async getTreatmentRate() {
    const total = await this.prisma.signal.count();
    const treated = await this.prisma.signal.count({
      where: { signal_status: true },
    });
    return { rate: total ? (treated / total) * 100 : 0, total, treated };
  }

  async getOverview() {
    const signals = await this.prisma.signal.count();
    const treated = await this.prisma.signal.count({
      where: { signal_status: true },
    });
    const collects = await this.prisma.collect.count();

    return { signals, treated, collects };
  }
}