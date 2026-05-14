import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';
import { CrudService } from 'src/services/crud-service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends CrudService<
  PrismaService["user"],
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput,
  Prisma.UserWhereUniqueInput
>{
  constructor(private prisma: PrismaService) {
    super(prisma.user);
  }

  async getAllUsers(){
    return super.findAll();
  }

  async createUser(data: Prisma.UserCreateInput) {
    // Vérifier si l'email existe déjà
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return super.create({ ...data, password: hashedPassword });
  }


  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

}