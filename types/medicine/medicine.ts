export interface Dosage {
  DailyDoses: number;
  doseUnit: string;
  DoseQuantity: number;
}

export interface MedicineEntity {
  id?: string;
  name: string;
  form: string;
  dosage: Dosage;
  startDate?: Date;
  endDate?: Date;
  note?: string;
}
