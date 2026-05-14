export interface Bus {
  id_bus: number;
  matricule: string;
  bus_status: boolean;
  id_line: number;
  id_localisation: number;
  line: {
    id_line: number;
    nb_line: string;
  };
  localisation: {
    id_localisation: number;
    longitude: number;
    latitude: number;
  };
  driver?: {
    id_driver: number;
    id_user: number;
    user: {
      id_user: number;
      user_name: string;
      email: string;
    };
  };
}

export interface BusResponse {
  statusCode: number;
  message: string;
  data: Bus[];
}