export interface BusManagementItem {
  matricule: string;
  ligne: string;
  chauffeur: string;
  statut: "APTE" | "INAPTE";
  derniereVisite: string;
  expiration: string;
  idBus: number;
  joursRestants: number;
  pourcentage: number;
}

export interface BusManagementData {
  busRetires: number;
  buses: BusManagementItem[];
}

export interface BusManagementResponse {
  statusCode: number;
  message: string;
  data: BusManagementData;
}