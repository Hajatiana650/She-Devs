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

  async getVisitsByDriver(idDriver: number) {
    try {
      // Récupérer le driver avec son bus
      const driver = await this.prisma.driver.findUnique({
        where: { id_driver: idDriver },
        include: {
          bus: true,
        },
      });

      if (!driver) {
        throw new NotFoundException(`Driver with id ${idDriver} not found`);
      }

      // Récupérer la dernière visite (tous types) du bus
      const lastInsuranceVisit = await this.prisma.visitInsurance.findFirst({
        where: {
          busId: driver.id_bus,
        },
        orderBy: {
          dateVisit: 'desc',
        },
      });

      if (!lastInsuranceVisit) {
        throw new NotFoundException(
          `No visit found for driver ${idDriver}`,
        );
      }

      // Calculer les données
      const dateVisit = new Date(lastInsuranceVisit.dateVisit);
      const dateLimit = new Date(lastInsuranceVisit.dateLimit);
      const today = new Date();

      // Format JJ/MM/YYYY
      const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

      const lastVisitDate = formatDate(dateVisit);
      const expirationDate = formatDate(dateLimit);

      // Calculer jours restants
      const daysRemaining = Math.ceil(
        (dateLimit.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      );

      // Calculer pourcentage (supposer 365 jours de validité standard)
      const totalDaysValidity = Math.ceil(
        (dateLimit.getTime() - dateVisit.getTime()) / (1000 * 60 * 60 * 24),
      );
      const percentage = Math.max(
        0,
        Math.min(
          100,
          Math.round((daysRemaining / totalDaysValidity) * 100),
        ),
      );

      // Formater le compte à rebours
      let countdown = '';
      if (daysRemaining < 0) {
        countdown = `EXPIRÉ depuis ${Math.abs(daysRemaining)} jour(s)`;
      } else if (daysRemaining === 0) {
        countdown = 'Expire AUJOURD\'HUI';
      } else if (daysRemaining === 1) {
        countdown = 'Expire dans 1 jour';
      } else {
        countdown = `Expire dans ${daysRemaining} jours`;
      }

      return {
        statusCode: 200,
        message: 'Driver insurance visits retrieved successfully',
        data: {
          lastVisitDate,
          status: lastInsuranceVisit.result,
          expirationDate,
          countdown,
          percentage,
          visitId: lastInsuranceVisit.id,
          visitType: lastInsuranceVisit.visitType,
          observation: lastInsuranceVisit.observation || null,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
