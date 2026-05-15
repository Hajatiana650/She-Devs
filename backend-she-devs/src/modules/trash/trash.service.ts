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
        status: 'EN_ATTENTE',
      },
    });

    const plannedCollects = await this.prisma.collect.count({
      where: {
        status: 'PLANIFIÉE',
      },
    });

    const priorityQuarters = await this.prisma.signal.groupBy({
      by: ['quarter_id'],
      where: {
        priority: 'HAUTE',
      },
      _count: true,
    });

    const treatedSignals = await this.prisma.signal.count({
      where: {
        status: 'TRAITÉ',
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
        user: true,
      },
      orderBy: {
        date_signal: 'desc',
      },
    });
  }

  async createSignal(dto: CreateSignalDto) {
    return this.prisma.signal.create({
      data: {
        photo: dto.photo,
        description: dto.description,
        priority: dto.priority || 'NORMALE',
        status: dto.status || 'EN_ATTENTE',
        quarter_id: dto.quarter_id,
        user_id: dto.user_id,
      },
      include: {
        quarter: true,
        user: true,
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
      data: { status },
      include: {
        quarter: true,
        user: true,
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
      where: { quarter_id: quarterId },
      include: {
        quarter: true,
        user: true,
      },
      orderBy: { date_signal: 'desc' },
    });
  }

  async getSignalsByPriority(priority: string) {
    return this.prisma.signal.findMany({
      where: { priority },
      include: {
        quarter: true,
        user: true,
      },
      orderBy: { date_signal: 'desc' },
    });
  }
}