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

export type SimpleMedicineEntity = Omit<
  MedicineEntity,
  'form' | 'dosage' | 'startDate' | 'endDate' | 'note'
>;

export interface MedicineDbEntity {
  id: string;
  name: string;
  form: string;
  numberOfDailyDoses: number;
  doseUnit: string;
  doseQuantity: number;
  startDate?: Date;
  endDate?: Date;
  note?: string;
}