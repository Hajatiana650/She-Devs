import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';
import { CrudService } from 'src/services/crud-service';
import { CreateLineDto } from './dto/create-line.dto';
import { UpdateLineDto } from './dto/update-line.dto';

@Injectable()
export class LineService extends CrudService<
  PrismaService["line"],
  Prisma.LineCreateInput,
  Prisma.LineUpdateInput,
  Prisma.LineWhereUniqueInput
>{
  constructor(private prisma: PrismaService) {
    super(prisma.line);
  }

  async create(data: Prisma.LineCreateInput) {
    return super.create(data);
  }

  async findAll() {
    try {
      const lines = await this.prisma.line.findMany({
        include: {
          buses: {
            include: {
              localisation: true,
              driver: {
                include: { user: true },
              },
            },
          },
          stops: {
            include: { localisation: true },
          },
        },
      });

      return {
        statusCode: 200,
        message: 'All lines',
        data: lines,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    const line = await this.prisma.line.findUnique({
      where: { id_line: id },
      include: {
        buses: {
          include: {
            localisation: true,
            driver: {
              include: { user: true },
            },
          },
        },
        stops: {
          include: { localisation: true },
        },
      },
    });

    if (!line) {
      throw new NotFoundException(`Line with id ${id} not found`);
    }

    return line;
  }

  async update(
    where: Prisma.LineWhereUniqueInput,
    data: Prisma.LineUpdateInput,
  ) {
    return super.update(where, data);
  }

  async delete(where: Prisma.LineWhereUniqueInput) {
    return super.delete(where);
  }
}
