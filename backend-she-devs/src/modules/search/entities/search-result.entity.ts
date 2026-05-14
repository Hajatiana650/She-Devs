export class SearchResult {
  line!: {
    id_line: number;
    nb_line: string;
    color?: string;
  };
  bus!: {
    id_bus: number;
    matricule: string;
    bus_status: boolean;
    occupation: number;
  };
  departStop!: {
    id_stop: number;
    name_stop: string;
    distanceToStop: number;
    walkingTimeMinutes: number;
    latitude: number;
    longitude: number;
  };
  arrivalStop!: {
    id_stop: number;
    name_stop: string;
    latitude: number;
    longitude: number;
  };
  estimatedDuration!: number;
  nextArrivalTime!: Date;
  minutesUntilArrival!: number;
  totalDistance!: number;
}
