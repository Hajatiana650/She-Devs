// types/driver.ts

export interface Driver {
  id_driver: number;
  id_user: number;
  id_bus: number;

  user: {
    id_user: number;
    user_name: string;
    email: string;
  };

  bus: {
    id_bus: number;
    matricule: string;
    bus_status: boolean;
    id_line: number;
    id_localisation: number;
  };
}

export type DriverResponse = Driver[];