// src/modules/campaign/campaign.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Injectable()
export class CampaignService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.notice.findMany({
      include: {
        quarter: true,
      },
      orderBy: {
        date_notice: 'desc',
      },
    });
  }

  async findOne(id_notice: number) {
    return this.prisma.notice.findUnique({
      where: { id_notice },
      include: {
        quarter: true,
      },
    });
  }

  async findByQuarter(quarterId: number) {
    return this.prisma.notice.findMany({
      where: { id_quarter: quarterId },
      include: {
        quarter: true,
      },
      orderBy: { date_notice: 'desc' },
    });
  }

  async create(dto: CreateCampaignDto) {
    return this.prisma.notice.create({
      data: {
        title: dto.title || 'Campagne',
        content: dto.message || '',
        description: dto.message || '',
        date_notice: new Date(),
        id_quarter: dto.quarter_ids?.[0] || 1,
      },
      include: {
        quarter: true,
      },
    });
  }

  async update(id_notice: number, dto: Partial<CreateCampaignDto>) {
    const notice = await this.findOne(id_notice);
    if (!notice) {
      throw new NotFoundException('Campaign not found');
    }

    return this.prisma.notice.update({
      where: { id_notice },
      data: {
        title: dto.title,
        content: dto.message,
        description: dto.message,
      },
      include: {
        quarter: true,
      },
    });
  }

  async updateStatus(id_notice: number, status: string) {
    return this.prisma.notice.update({
      where: { id_notice },
      data: {
        title: status,
      },
      include: {
        quarter: true,
      },
    });
  }

  async incrementParticipants(id_notice: number, count: number = 1) {
    return this.prisma.notice.findUnique({
      where: { id_notice },
    });
  }

  async remove(id_notice: number) {
    return this.prisma.notice.delete({
      where: { id_notice },
    });
  }
}