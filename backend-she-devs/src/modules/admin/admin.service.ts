import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateAdminUserDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async createAdminUser(createAdminUserDto: CreateAdminUserDto) {
    // Créer l'utilisateur via UserService
    const userResponse = await this.userService.createUser({
      user_name: createAdminUserDto.user_name,
      email: createAdminUserDto.email,
      password: createAdminUserDto.password,
    } as any);

    // Extraire les données du user du wrapper
    const user = userResponse?.data || userResponse;
    if (!user?.id_user) {
      throw new Error('Failed to create user');
    }

    // Créer l'admin associé au user
    const admin = await this.prisma.admin.create({
      data: {
        rolee: createAdminUserDto.rolee as any,
        id_user: user.id_user,
      },
      include: { user: true },
    });

    return admin;
  }

  async findAll() {
    return this.prisma.admin.findMany({
      include: { user: true },
    });
  }

  async findOne(id: number) {
    const admin = await this.prisma.admin.findUnique({
      where: { id_admin: id },
      include: { user: true },
    });

    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }

    return admin;
  }
}
