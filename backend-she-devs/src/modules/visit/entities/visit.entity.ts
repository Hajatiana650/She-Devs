export class Visit {
  id!: number;
  busId!: number;
  visitType!: string;
  result!: string;
  dateVisit!: Date;
  dateLimit!: Date;
  observation?: string;
  attachment?: string;
  createdAt!: Date;
  updatedAt!: Date;
}
