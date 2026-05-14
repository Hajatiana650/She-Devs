export interface Bus {
  id_bus: number;
  matricule: string;
  bus_status: boolean;
  id_line: number;
  id_localisation: number;
  createdAt?: string;
  updatedAt?: string;

  last_seen_at?: string;
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

export interface BusLine {
  id_line: number;
  nb_line: string;
}

export interface BusLocalisation {
  id_localisation: number;
  longitude: number;
  latitude: number;
}

export interface User {
  id_user: number;
  user_name: string;
  email: string;
}

export interface Driver {
  id_driver: number;
  id_user: number;
  id_bus: number;
  user: User;
}

