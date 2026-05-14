import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSearchDto } from './dto/create-search.dto';
import { SearchResponseDto, BusInfoDto, LineInfoDto, StopInfoDto } from './dto/search-response.dto';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  /**
   * Calcule la distance entre deux points GPS en utilisant la formule Haversine
   * Retourne la distance en mètres
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000; // Rayon de la Terre en mètres
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Convertit les degrés en radians
   */
  private toRad(deg: number): number {
    return (deg * Math.PI) / 180;
  }

  /**
   * Simule l'occupation d'un bus (0-100%)
   */
  private simulateOccupation(): number {
    return Math.floor(Math.random() * 100);
  }

  /**
   * Simule une couleur pour la ligne
   */
  private getLineColor(lineId: number): string {
    const colors = ['#FF0000', '#0000FF', '#00AA00', '#FFAA00', '#AA00FF', '#00AAAA'];
    return colors[lineId % colors.length];
  }

  /**
   * Recherche les trajets disponibles selon les critères
   */
  async searchRoutes(searchDto: CreateSearchDto): Promise<SearchResponseDto[]> {
    // Vérifier que au moins un critère est fourni
    if (!searchDto.id_line && !searchDto.id_stop_depart) {
      throw new BadRequestException(
        'You must provide either id_line or id_stop_depart along with id_stop_arrivee',
      );
    }

    // Direction par défaut = ALLER
    const direction = searchDto.direction || 'ALLER';

    // Récupérer l'arrêt d'arrivée
    const arrivalStop = await this.prisma.stop.findUnique({
      where: { id_stop: searchDto.id_stop_arrivee },
      include: { localisation: true, line: true },
    });

    if (!arrivalStop) {
      throw new NotFoundException(`Arrival stop with id ${searchDto.id_stop_arrivee} not found`);
    }

    // Vérifier que l'arrêt d'arrivée est dans la bonne direction
    if (arrivalStop.direction !== direction) {
      throw new BadRequestException(
        `Arrival stop is on direction ${arrivalStop.direction}, but you requested ${direction}`,
      );
    }

    // Récupérer l'arrêt de départ
    let departStop: any = null;
    if (searchDto.id_stop_depart) {
      departStop = await this.prisma.stop.findUnique({
        where: { id_stop: searchDto.id_stop_depart },
        include: { localisation: true, line: true },
      });

      if (!departStop) {
        throw new NotFoundException(`Departure stop with id ${searchDto.id_stop_depart} not found`);
      }

      // Vérifier que l'arrêt de départ est dans la bonne direction
      if (departStop.direction !== direction) {
        throw new BadRequestException(
          `Departure stop is on direction ${departStop.direction}, but you requested ${direction}`,
        );
      }

      // Vérifier que les 2 arrêts sont sur la MÊME ligne
      if (departStop.id_line !== arrivalStop.id_line) {
        throw new BadRequestException(
          'Departure and arrival stops must be on the same line',
        );
      }

      // Valider la séquence logique d'ordre
      // Pour ALLER: order_stop de départ < order_stop d'arrivée
      // Pour RETOUR: order_stop de départ > order_stop d'arrivée
      if (direction === 'ALLER' && departStop.order_stop >= arrivalStop.order_stop) {
        throw new BadRequestException(
          'For ALLER direction: departure stop must come before arrival stop',
        );
      }
      if (direction === 'RETOUR' && departStop.order_stop <= arrivalStop.order_stop) {
        throw new BadRequestException(
          'For RETOUR direction: departure stop must come after arrival stop',
        );
      }
    }

    // Déterminer la(les) ligne(s) à rechercher
    const lines: any[] = [];
    if (searchDto.id_line) {
      const line = await this.prisma.line.findUnique({
        where: { id_line: searchDto.id_line },
      });
      if (!line) {
        throw new NotFoundException(`Line with id ${searchDto.id_line} not found`);
      }
      lines.push(line);
    } else if (departStop && arrivalStop.line) {
      lines.push(arrivalStop.line);
    } else {
      // Rechercher toutes les lignes contenant l'arrêt d'arrivée
      const lineIds = [arrivalStop.id_line];
      const foundLines = await this.prisma.line.findMany({
        where: { id_line: { in: lineIds } },
      });
      lines.push(...foundLines);
    }

    const results: SearchResponseDto[] = [];

    // Pour chaque ligne, chercher les sessions ACTIVE
    for (const line of lines) {
      // ⭐ NOUVEAU: Rechercher uniquement les sessions ACTIVE
      const activeSessions = await this.prisma.transportSession.findMany({
        where: {
          status: 'ACTIVE',
          bus: {
            id_line: line.id_line,
            bus_status: true, // Bus apte
          },
          direction: direction, // ← Session dans la bonne direction
        },
        include: {
          bus: {
            include: {
              localisation: true,
              driver: {
                include: { user: true },
              },
            },
          },
        },
      });

      // Si aucune session active, passer à la ligne suivante
      if (activeSessions.length === 0) {
        continue;
      }

      // Chercher tous les arrêts de cette ligne ET dans la bonne direction
      const stops = await this.prisma.stop.findMany({
        where: { 
          id_line: line.id_line,
          direction: direction, // ← FILTRE PAR DIRECTION
        },
        include: { localisation: true },
        orderBy: { order_stop: 'asc' },
      });

      if (stops.length === 0) {
        continue;
      }

      // Créer les résultats pour chaque session active
      for (const session of activeSessions) {
        const bus = session.bus;

        // Utiliser l'arrêt de départ fourni, ou le premier arrêt de la ligne
        const departStopToUse = departStop || stops[0];

        // Calculer les distances et temps
        const distanceToDepartStop = this.calculateDistance(
          bus.localisation!.latitude,
          bus.localisation!.longitude,
          departStopToUse.localisation!.latitude,
          departStopToUse.localisation!.longitude,
        );

        const walkingTimeMinutes = Math.ceil(distanceToDepartStop / 400); // 1 min par 400m

        // Estimer l'heure d'arrivée du bus (ajouter le temps jusqu'au stop + temps de trajet)
        const now = new Date();
        const minutesUntilDepartStop = Math.max(1, Math.floor(distanceToDepartStop / 1000)); // Simule 1 km par minute
        const nextArrivalTime = new Date(now.getTime() + minutesUntilDepartStop * 60000);

        // Calculer la distance et la durée du trajet
        const routeDistance = this.calculateDistance(
          departStopToUse.localisation!.latitude,
          departStopToUse.localisation!.longitude,
          arrivalStop.localisation!.latitude,
          arrivalStop.localisation!.longitude,
        );

        const estimatedDuration = Math.max(1, Math.round(routeDistance / 1000)); // Environ 1 min par km

        const lineInfo: LineInfoDto = {
          id_line: line.id_line,
          nb_line: line.nb_line,
          color: this.getLineColor(line.id_line),
        };

        const busInfo: BusInfoDto = {
          id_bus: bus.id_bus,
          matricule: bus.matricule,
          bus_status: bus.bus_status,
          occupation: this.simulateOccupation(),
          latitude: bus.localisation!.latitude,
          longitude: bus.localisation!.longitude,
        };

        const departStopInfo: StopInfoDto = {
          id_stop: departStopToUse.id_stop,
          name_stop: departStopToUse.name_stop,
          order_stop: departStopToUse.order_stop,
          direction: departStopToUse.direction,
          distanceToStop: Math.round(distanceToDepartStop),
          walkingTimeMinutes,
          latitude: departStopToUse.localisation!.latitude,
          longitude: departStopToUse.localisation!.longitude,
        };

        const arrivalStopInfo: StopInfoDto = {
          id_stop: arrivalStop.id_stop,
          name_stop: arrivalStop.name_stop,
          order_stop: arrivalStop.order_stop,
          direction: arrivalStop.direction,
          latitude: arrivalStop.localisation!.latitude,
          longitude: arrivalStop.localisation!.longitude,
        };

        results.push({
          line: lineInfo,
          bus: busInfo,
          sessionId: session.id_session,
          sessionStatus: session.status,
          direction: direction,
          departStop: departStopInfo,
          arrivalStop: arrivalStopInfo,
          nextArrivalTime,
          minutesUntilArrival: minutesUntilDepartStop,
          estimatedDuration,
          totalDistance: Math.round(routeDistance),
          status: bus.bus_status ? 'EN SERVICE' : 'HORS SERVICE',
        });
      }
    }

    // Trier par temps d'arrivée croissant
    results.sort((a, b) => a.nextArrivalTime.getTime() - b.nextArrivalTime.getTime());

    if (results.length === 0) {
      throw new NotFoundException('No available routes found matching your criteria');
    }

    return results;
  }
}
