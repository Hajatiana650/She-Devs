export interface Visit {
  id: number;
  busId: number;
  visitType: "TECHNICAL_VISIT" | "CONTROL" | "OTHER";
  result: "APTE" | "INAPTE";
  dateVisit: string;
  dateLimit: string;
  observation?: string;
  attachment?: string;

  createdAt: string;
  updatedAt: string;
}

export interface VisitResponse {
  statusCode: number;
  message: string;
  data: Visit[];
}
export interface Visit {
  id: number;
  busId: number;
  visitType: "TECHNICAL_VISIT" | "CONTROL" | "OTHER";
  result: "APTE" | "INAPTE";
  dateVisit: string;
  dateLimit: string;
  observation?: string;
  attachment?: string;

  createdAt: string;
  updatedAt: string;
}

export interface VisitResponse {
  statusCode: number;
  message: string;
  data: Visit[];
}