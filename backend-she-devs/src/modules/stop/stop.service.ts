import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';
import { CrudService } from 'src/services/crud-service';
import { CreateStopDto } from './dto/create-stop.dto';
import { UpdateStopDto } from './dto/update-stop.dto';

@Injectable()
export class StopService extends CrudService<
  PrismaService["stop"],
  Prisma.StopCreateInput,
  Prisma.StopUpdateInput,
  Prisma.StopWhereUniqueInput
>{
  constructor(private prisma: PrismaService) {
    super(prisma.stop);
  }

  async create(data: Prisma.StopCreateInput) {
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
      const stops = await this.prisma.stop.findMany({
        include: {
          line: true,
          localisation: true,
        },
      });

      return {
        statusCode: 200,
        message: 'All stops',
        data: stops,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    const stop = await this.prisma.stop.findUnique({
      where: { id_stop: id },
      include: {
        line: true,
        localisation: true,
      },
    });

    if (!stop) {
      throw new NotFoundException(`Stop with id ${id} not found`);
    }

    return stop;
  }

  async update(
    where: Prisma.StopWhereUniqueInput,
    data: Prisma.StopUpdateInput,
  ) {
    return super.update(where, data);
  }

  async delete(where: Prisma.StopWhereUniqueInput) {
    return super.delete(where);
  }
}
