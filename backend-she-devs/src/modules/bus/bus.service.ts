import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';
import { CrudService } from 'src/services/crud-service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';

@Injectable()
export class BusService extends CrudService<
  PrismaService["bus"],
  Prisma.BusCreateInput,
  Prisma.BusUpdateInput,
  Prisma.BusWhereUniqueInput
>{
  constructor(private prisma: PrismaService) {
    super(prisma.bus);
  }

  async create(data: Prisma.BusCreateInput) {
    // Vérifier que la ligne existe
    if ('id_line' in data && data.id_line) {
      const line = await this.prisma.line.findUnique({
        where: { id_line: data.id_line as number },
      });

      if (!line) {
        throw new NotFoundException(
          `Line with id ${data.id_line} not found`,
        );
      }
    }

    // Vérifier que la localisation existe
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
      const buses = await this.prisma.bus.findMany({
        include: {
          line: true,
          localisation: true,
          driver: {
            include: { user: true },
          },
        },
      });

      return {
        statusCode: 200,
        message: 'All buses',
        data: buses,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    const bus = await this.prisma.bus.findUnique({
      where: { id_bus: id },
      include: {
        line: true,
        localisation: true,
        driver: {
          include: { user: true },
        },
      },
    });

    if (!bus) {
      throw new NotFoundException(`Bus with id ${id} not found`);
    }

    return bus;
  }

  async update(
    where: Prisma.BusWhereUniqueInput,
    data: Prisma.BusUpdateInput,
  ) {
    return super.update(where, data);
  }

  async delete(where: Prisma.BusWhereUniqueInput) {
    return super.delete(where);
  }
}
