import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';
import { CrudService } from 'src/services/crud-service';
import { CreateQuarterDto } from './dto/create-quarter.dto';
import { UpdateQuarterDto } from './dto/update-quarter.dto';

@Injectable()
export class QuarterService extends CrudService<
  PrismaService["quarter"],
  Prisma.QuarterCreateInput,
  Prisma.QuarterUpdateInput,
  Prisma.QuarterWhereUniqueInput
>{
  constructor(private prisma: PrismaService) {
    super(prisma.quarter);
  }

  async create(data: Prisma.QuarterCreateInput) {
    // Vérifier que la localisation existe si id_localisation est fourni
    if ('id_localisation' in data && data.id_localisation) {
      const localisation = await this.prisma.localisation.findUnique({
        where: { id_localisation: data.id_localisation as number },
      });

      if (!localisation) {
        throw new NotFoundException(
          `Localisation with id ${data.id_localisation} not found`,
        );
      }
    }

    return super.create(data);
  }

  async findAll() {
    try {
      const quarters = await this.prisma.quarter.findMany({
        include: {
          localisation: true,
          populations: true,
          signals: true,
          notices: true,
          collects: true,
        },
      });

      return {
        statusCode: 200,
        message: 'All quarters',
        data: quarters,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    const quarter = await this.prisma.quarter.findUnique({
      where: { id_quarter: id },
      include: {
        localisation: true,
        populations: true,
        signals: true,
        notices: true,
        collects: true,
      },
    });

    if (!quarter) {
      throw new NotFoundException(`Quarter with id ${id} not found`);
    }

    return quarter;
  }

  async update(
    where: Prisma.QuarterWhereUniqueInput,
    data: Prisma.QuarterUpdateInput,
  ) {
    return super.update(where, data);
  }

  async delete(where: Prisma.QuarterWhereUniqueInput) {
    return super.delete(where);
  }
}
