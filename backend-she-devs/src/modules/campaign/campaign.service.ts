// src/modules/campaign/campaign.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Injectable()
export class CampaignService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.campaign.findMany({
      include: {
        quarters: {
          include: {
            quarter: true,
          },
        },
      },
      orderBy: {
        date_start: 'desc',
      },
    });
  }

  async findOne(id_campaign: number) {
    return this.prisma.campaign.findUnique({
      where: { id_campaign },
      include: {
        quarters: {
          include: {
            quarter: true,
          },
        },
      },
    });
  }

  async findByStatus(status: string) {
    return this.prisma.campaign.findMany({
      where: { status },
      include: {
        quarters: {
          include: {
            quarter: true,
          },
        },
      },
      orderBy: { date_start: 'desc' },
    });
  }

  async create(dto: CreateCampaignDto) {
    return this.prisma.campaign.create({
      data: {
        title: dto.title,
        message: dto.message,
        date_start: new Date(dto.date_start),
        date_end: new Date(dto.date_end),
        status: 'ACTIVE',
        participant_count: 0,
        quarters: {
          create: dto.quarter_ids.map((quarter_id) => ({
            quarter_id,
          })),
        },
      },
      include: {
        quarters: {
          include: {
            quarter: true,
          },
        },
      },
    });
  }

  async update(id_campaign: number, dto: Partial<CreateCampaignDto>) {
    const campaign = await this.findOne(id_campaign);
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    return this.prisma.campaign.update({
      where: { id_campaign },
      data: {
        title: dto.title,
        message: dto.message,
        date_start: dto.date_start ? new Date(dto.date_start) : undefined,
        date_end: dto.date_end ? new Date(dto.date_end) : undefined,
      },
      include: {
        quarters: {
          include: {
            quarter: true,
          },
        },
      },
    });
  }

  async updateStatus(id_campaign: number, status: string) {
    return this.prisma.campaign.update({
      where: { id_campaign },
      data: { status },
      include: {
        quarters: {
          include: {
            quarter: true,
          },
        },
      },
    });
  }

  async incrementParticipants(id_campaign: number, count: number = 1) {
    return this.prisma.campaign.update({
      where: { id_campaign },
      data: {
        participant_count: {
          increment: count,
        },
      },
    });
  }

  async remove(id_campaign: number) {
    return this.prisma.campaign.delete({
      where: { id_campaign },
    });
  }
}