import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';
import { CrudService } from 'src/services/crud-service';
import { CreateLocalisationDto, GetNearbyLocalisationDto } from './dto/create-localisation.dto';
import { UpdateLocalisationDto } from './dto/update-localisation.dto';

@Injectable()
export class LocalisationService extends CrudService<
  PrismaService["localisation"],
  Prisma.LocalisationCreateInput,
  Prisma.LocalisationUpdateInput,
  Prisma.LocalisationWhereUniqueInput
>{
  constructor(private prisma: PrismaService) {
    super(prisma.localisation);
  }

  async create(createLocalisationDto: CreateLocalisationDto) {
    const data = {
      latitude: createLocalisationDto.latitude,
      longitude: createLocalisationDto.longitude,
    };
    return super.create(data);
  }

  async findOne(id: number) {
    const localisation = await this.prisma.localisation.findUnique({
      where: { id_localisation: id },
      include: {
        quarters: true,
        populations: true,
        buses: true,
        stops: true,
      },
    });

    if (!localisation) {
      throw new NotFoundException(`Localisation with id ${id} not found`);
    }

    return localisation;
  }

  /**
   * Calcule la distance entre deux points en utilisant la formule de Haversine
   * @param lat1 Latitude du point 1
   * @param lon1 Longitude du point 1
   * @param lat2 Latitude du point 2
   * @param lon2 Longitude du point 2
   * @returns Distance en kilomètres
   */
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Rayon de la Terre en km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }


  async update(
    where: Prisma.LocalisationWhereUniqueInput,
    data: Prisma.LocalisationUpdateInput,
  ) {
    return super.update(where, data);
  }

  async delete(where: Prisma.LocalisationWhereUniqueInput) {
    return super.delete(where);
  }
}
