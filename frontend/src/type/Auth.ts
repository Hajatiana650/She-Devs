
export interface LoginCredentials {
  email: string;
  password: string;
}


export interface PopulationUser {
  id_user: number;
  user_name: string;
  email: string;
  id_quarter: number;
  id_localisation: number;
}

export interface DriverUser {
  id_user: number;
  user_name: string;
  email: string;
  id_quarter: number;
  id_localisation: number;
}

export interface AdminBusUser {
  id_admin: number;
  rolee: "BUS";
  id_user: number;
  user: {
    id_user: number;
    user_name: string;
    email: string;
    password: string;
  };
}

export interface AdminTrashUser {
  id_admin: number;
  rolee: "TRASH";
  id_user: number;
  user: {
    id_user: number;
    user_name: string;
    email: string;
    password: string;
  };
}


export type AuthProfile =
  | ({ role: "POPULATION" } & PopulationUser)
  | ({ role: "CHAUFFEUR" } & DriverUser)
  | ({ role: "ADMIN_BUS" } & AdminBusUser)
  | ({ role: "ADMIN_TRASH" } & AdminTrashUser);


export interface LoginResponse {
  access_token: string;
  token_type?: string;
  profile: AuthProfile;
}