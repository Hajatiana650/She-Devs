import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateDriverUserDto } from './dto/create-driver.dto';

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
}
