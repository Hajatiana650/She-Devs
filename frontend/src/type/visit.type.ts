// types/visit.ts

export interface Visit {
  id: number;
  busId: number;
  visitType: string;
  result: string;
  dateVisit: string;
  dateLimit: string;
  observation: string;
  attachment: string;
  createdAt: string;
  updatedAt: string;

  bus: {
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
  };
}

export interface VisitResponse {
  statusCode: number;
  message: string;
  data: Visit[];
}
export interface VisitPayload {
  busId: number;
  visitType: "TECHNICAL_VISIT" | "CONTROL" | "OTHER";
  result: "APTE" | "INAPTE";
  dateVisit: string;
  dateLimit: string;
  observation?: string;
  attachment?: string;
}