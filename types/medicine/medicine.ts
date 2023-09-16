export interface Dosage {
  dailyDoses: number;
  doseUnit: string;
  doseQuantity: number;
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
