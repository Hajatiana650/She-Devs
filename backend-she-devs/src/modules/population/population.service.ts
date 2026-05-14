import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreatePopulationUserDto } from './dto/create-population.dto';

@Injectable()
export class PopulationService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async createPopulationUser(createPopulationUserDto: CreatePopulationUserDto) {
    // Vérifier que le quartier existe
    const quarter = await this.prisma.quarter.findUnique({
      where: { id_quarter: createPopulationUserDto.id_quarter },
    });

    if (!quarter) {
      throw new NotFoundException(
        `Quarter with id ${createPopulationUserDto.id_quarter} not found`,
      );
    }

    // Vérifier que la localisation existe
    const localisation = await this.prisma.localisation.findUnique({
      where: { id_localisation: createPopulationUserDto.id_localisation },
    });

    if (!localisation) {
      throw new NotFoundException(
        `Localisation with id ${createPopulationUserDto.id_localisation} not found`,
      );
    }

    // Créer l'utilisateur via UserService
    const userResponse = await this.userService.createUser({
      user_name: createPopulationUserDto.user_name,
      email: createPopulationUserDto.email,
      password: createPopulationUserDto.password,
    } as any);

    // Extraire les données du user du wrapper
    const user = userResponse?.data || userResponse;
    if (!user?.id_user) {
      throw new Error('Failed to create user');
    }

    // Créer la population associée au user
    const population = await this.prisma.population.create({
      data: {
        id_user: user.id_user,
        id_quarter: createPopulationUserDto.id_quarter,
        id_localisation: createPopulationUserDto.id_localisation,
      },
      include: {
        user: true,
        quarter: true,
        localisation: true,
      },
    });

    return population;
  }

  async findAll() {
    return this.prisma.population.findMany({
      include: {
        user: true,
        quarter: true,
        localisation: true,
        signals: true,
      },
    });
  }

  async findOne(id: number) {
    const population = await this.prisma.population.findUnique({
      where: { id_population: id },
      include: {
        user: true,
        quarter: true,
        localisation: true,
        signals: true,
      },
    });

    if (!population) {
      throw new NotFoundException(`Population with id ${id} not found`);
    }

    return population;
  }
}
