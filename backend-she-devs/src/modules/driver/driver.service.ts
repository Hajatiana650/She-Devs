import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateDriverUserDto } from './dto/create-driver.dto';
import { DriverListDto } from './dto/driver-list.dto';

@Injectable()
export class DriverService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async createDriverUser(createDriverUserDto: CreateDriverUserDto) {
    // Vérifier que le bus existe
    const bus = await this.prisma.bus.findUnique({
      where: { id_bus: createDriverUserDto.id_bus },
    });

    if (!bus) {
      throw new NotFoundException(
        `Bus with id ${createDriverUserDto.id_bus} not found`,
      );
    }

    // Créer l'utilisateur via UserService
    const userResponse = await this.userService.createUser({
      user_name: createDriverUserDto.user_name,
      email: createDriverUserDto.email,
      password: createDriverUserDto.password,
    } as any);

    // Extraire les données du user du wrapper
    const user = userResponse?.data || userResponse;
    if (!user?.id_user) {
      throw new Error('Failed to create user');
    }

    // Créer le driver associé au user
    const driver = await this.prisma.driver.create({
      data: {
        id_user: user.id_user,
        id_bus: createDriverUserDto.id_bus,
      },
      include: {
        user: true,
        bus: true,
      },
    });

    return driver;
  }

  async findAll() {
    return this.prisma.driver.findMany({
      include: {
        user: true,
        bus: true,
      },
    });
  }

  async findOne(id: number) {
    const driver = await this.prisma.driver.findUnique({
      where: { id_driver: id },
      include: {
        user: true,
        bus: true,
      },
    });

    if (!driver) {
      throw new NotFoundException(`Driver with id ${id} not found`);
    }

    return driver;
  }

  async getDriverList(): Promise<any> {
    try {
      const drivers = await this.prisma.driver.findMany({
        include: {
          user: true,
          bus: true,
        },
      });

      const driverList: DriverListDto[] = drivers.map((driver) => ({
        nom: driver.user.user_name,
        telephone: `+261 34 12 345 ${67 + driver.id_driver}`, // Simulation numéro téléphone
        busAssigne: driver.bus.matricule,
        statutBus: driver.bus.bus_status ? 'APTE' : 'INAPTE',
        idDriver: driver.id_driver,
        idBus: driver.id_bus,
      }));

      return {
        statusCode: 200,
        message: 'Driver list retrieved successfully',
        data: driverList,
      };
    } catch (error) {
      throw error;
    }
  }
}
