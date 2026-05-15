import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSignalDto } from './dto/create-signal.dto';

@Injectable()
export class TrashService {
  constructor(private prisma: PrismaService) {}

  async dashboard() {
    const pendingSignals = await this.prisma.signal.count({
      where: {
        signal_status: false,
      },
    });

    const plannedCollects = await this.prisma.collect.count({
      where: {
        date_collect: { not: undefined },
      },
    });

    const priorityQuarters = await this.prisma.signal.groupBy({
      by: ['id_quarter'],
      where: {
        signal_status: false,
      },
      _count: true,
    });

    const treatedSignals = await this.prisma.signal.count({
      where: {
        signal_status: true,
      },
    });

    return {
      pendingSignals,
      plannedCollects,
      priorityQuarters: priorityQuarters.length,
      treatedSignals,
    };
  }

  async findSignals() {
    return this.prisma.signal.findMany({
      include: {
        quarter: true,
        population: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        id_signal: 'desc',
      },
    });
  }

  async createSignal(dto: CreateSignalDto) {
    return this.prisma.signal.create({
      data: {
        photo: dto.photo ? dto.photo : 'default-signal.jpg',
        description: dto.description ? dto.description : 'Signal créé',
        signal_status: false,
        id_population: dto.user_id || 1,
        id_quarter: dto.quarter_id || 1,
      },
      include: {
        quarter: true,
        population: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async updateSignalStatus(id: number, status: string) {
    const signal = await this.prisma.signal.findUnique({
      where: { id_signal: id },
    });

    if (!signal) {
      throw new NotFoundException('Signal not found');
    }

    return this.prisma.signal.update({
      where: { id_signal: id },
      data: { signal_status: true },
      include: {
        quarter: true,
        population: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async deleteSignal(id: number) {
    return this.prisma.signal.delete({
      where: { id_signal: id },
    });
  }

  async validateSignal(id: number) {
    return this.updateSignalStatus(id, 'TRAITÉ');
  }

  async getSignalsByQuarter(quarterId: number) {
    return this.prisma.signal.findMany({
      where: { id_quarter: quarterId },
      include: {
        quarter: true,
        population: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { id_signal: 'desc' },
    });
  }

  async getSignalsByPriority(priority: string) {
    return this.prisma.signal.findMany({
      where: { signal_status: false },
      include: {
        quarter: true,
        population: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { id_signal: 'desc' },
    });
  }
}