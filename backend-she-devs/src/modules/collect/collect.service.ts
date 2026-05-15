// src/modules/collect/collect.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCollectDto } from './dto/create-collect.dto';

@Injectable()
export class CollectService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.collect.findMany({
      include: {
        quarter: true,
      },
      orderBy: {
        date_collect: 'desc',
      },
    });
  }

  async findByQuarter(quarterId: number) {
    return this.prisma.collect.findMany({
      where: { id_quarter: quarterId },
      include: {
        quarter: true,
      },
      orderBy: { date_collect: 'desc' },
    });
  }

  async findByStatus(status: string) {
    return this.prisma.collect.findMany({
      where: { id_quarter: { not: undefined } },
      include: {
        quarter: true,
      },
      orderBy: { date_collect: 'desc' },
    });
  }

  async create(dto: CreateCollectDto) {
    return this.prisma.collect.create({
      data: {
        id_quarter: dto.quarter_id,
        date_collect: new Date(dto.date_collect),
      },
      include: {
        quarter: true,
      },
    });
  }

  async updateStatus(id: number, status: string) {
    const collect = await this.prisma.collect.findUnique({
      where: { id_collect: id },
    });

    if (!collect) {
      throw new NotFoundException('Collect not found');
    }

    return this.prisma.collect.update({
      where: { id_collect: id },
      data: { date_collect: new Date() },
      include: { quarter: true },
    });
  }

  async delete(id: number) {
    return this.prisma.collect.delete({
      where: { id_collect: id },
    });
  }
}