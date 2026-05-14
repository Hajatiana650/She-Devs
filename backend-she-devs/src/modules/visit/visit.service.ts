import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';
import { CrudService } from 'src/services/crud-service';

@Injectable()
export class VisitService extends CrudService<
  PrismaService["visitInsurance"],
  Prisma.VisitInsuranceCreateInput,
  Prisma.VisitInsuranceUpdateInput,
  Prisma.VisitInsuranceWhereUniqueInput
> {
  constructor(private prisma: PrismaService) {
    super(prisma.visitInsurance);
  }

  async create(data: Prisma.VisitInsuranceCreateInput) {
    // Vérifier que le bus existe
    if ('busId' in data && data.busId) {
      const bus = await this.prisma.bus.findUnique({
        where: { id_bus: data.busId as number },
      });

      if (!bus) {
        throw new NotFoundException(
          `Bus with id ${data.busId} not found`,
        );
      }
    }

    return super.create(data);
  }

  async findAll() {
    try {
      const visits = await this.prisma.visitInsurance.findMany({
        include: {
          bus: {
            include: {
              line: true,
              localisation: true,
            },
          },
        },
      });

      return {
        statusCode: 200,
        message: 'All visits',
        data: visits,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    const visit = await this.prisma.visitInsurance.findUnique({
      where: { id },
      include: {
        bus: {
          include: {
            line: true,
            localisation: true,
          },
        },
      },
    });

    if (!visit) {
      throw new NotFoundException(`Visit with id ${id} not found`);
    }

    return visit;
  }

  async update(
    where: Prisma.VisitInsuranceWhereUniqueInput,
    data: Prisma.VisitInsuranceUpdateInput,
  ) {
    return super.update(where, data);
  }

  async delete(where: Prisma.VisitInsuranceWhereUniqueInput) {
    return super.delete(where);
  }
}
