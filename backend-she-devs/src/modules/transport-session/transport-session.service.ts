import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';
import { CrudService } from 'src/services/crud-service';
import { StartTransportSessionDto } from './dto/start-transport-session.dto';
import { EndTransportSessionDto } from './dto/end-transport-session.dto';

@Injectable()
export class TransportSessionService extends CrudService<
  PrismaService["transportSession"],
  Prisma.TransportSessionCreateInput,
  Prisma.TransportSessionUpdateInput,
  Prisma.TransportSessionWhereUniqueInput
> {
  constructor(private prisma: PrismaService) {
    super(prisma.transportSession);
  }

  /**
   * Démarre une nouvelle session de transport
   */
  async startSession(dto: StartTransportSessionDto) {
    // Vérifier que le bus existe et est apte
    const bus = await this.prisma.bus.findUnique({
      where: { id_bus: dto.id_bus },
      include: { line: true, localisation: true },
    });

    if (!bus) {
      throw new NotFoundException(`Bus with id ${dto.id_bus} not found`);
    }

    if (!bus.bus_status) {
      throw new BadRequestException('Bus is not available (inapte)');
    }

    // Vérifier qu'il n'y a pas déjà une session ACTIVE ou WAITING pour ce bus
    const existingSession = await this.prisma.transportSession.findFirst({
      where: {
        id_bus: dto.id_bus,
        status: { in: ['ACTIVE', 'WAITING'] },
      },
    });

    if (existingSession) {
      throw new BadRequestException(
        `Bus already has an active or waiting session (id: ${existingSession.id_session})`,
      );
    }

    // Créer la session
    const session = await this.prisma.transportSession.create({
      data: {
        id_bus: dto.id_bus,
        direction: dto.direction,
        status: 'ACTIVE',
        start_time: new Date(),
      },
      include: {
        bus: {
          include: {
            line: true,
            localisation: true,
            driver: { include: { user: true } },
          },
        },
      },
    });

    return {
      statusCode: 201,
      message: 'Transport session started successfully',
      data: session,
    };
  }

  /**
   * Termine une session de transport
   */
  async endSession(dto: EndTransportSessionDto) {
    // Vérifier que la session existe
    const session = await this.prisma.transportSession.findUnique({
      where: { id_session: dto.id_session },
      include: { bus: true },
    });

    if (!session) {
      throw new NotFoundException(
        `Transport session with id ${dto.id_session} not found`,
      );
    }

    if (session.status === 'FINISHED') {
      throw new BadRequestException('Session is already finished');
    }

    if (session.status === 'CANCELLED') {
      throw new BadRequestException('Session is already cancelled');
    }

    // Mettre à jour la session
    const updatedSession = await this.prisma.transportSession.update({
      where: { id_session: dto.id_session },
      data: {
        status: 'FINISHED',
        end_time: new Date(),
      },
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
      message: 'Transport session ended successfully',
      data: updatedSession,
    };
  }

  /**
   * Récupère toutes les sessions (avec filtre optionnel par status)
   */
  async findAll(status?: 'WAITING' | 'ACTIVE' | 'FINISHED' | 'CANCELLED') {
    try {
      const where: any = status ? { status } : {};

      const sessions = await this.prisma.transportSession.findMany({
        where,
        include: {
          bus: {
            include: {
              line: true,
              localisation: true,
              driver: { include: { user: true } },
            },
          },
        },
        orderBy: { start_time: 'desc' },
      });

      return {
        statusCode: 200,
        message: `Sessions found (${sessions.length})`,
        data: sessions,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Récupère les sessions ACTIVE uniquement
   */
  async findActiveSessions() {
    try {
      const sessions = await this.prisma.transportSession.findMany({
        where: { status: 'ACTIVE' },
        include: {
          bus: {
            include: {
              line: true,
              localisation: true,
              driver: { include: { user: true } },
            },
          },
        },
      });

      return {
        statusCode: 200,
        message: `Active sessions found (${sessions.length})`,
        data: sessions,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Récupère une session par ID
   */
  async findOne(id: number) {
    const session = await this.prisma.transportSession.findUnique({
      where: { id_session: id },
      include: {
        bus: {
          include: {
            line: true,
            localisation: true,
            driver: { include: { user: true } },
          },
        },
      },
    });

    if (!session) {
      throw new NotFoundException(`Session with id ${id} not found`);
    }

    return session;
  }
}
