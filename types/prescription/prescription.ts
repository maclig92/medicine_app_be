export interface PrescriptionEntity {
  id?: string;
  prescriptionNumber: number;
  issueDate: Date;
  isYearly?: boolean;
  isAntibiotic?: boolean;
  expireDate?: Date;
}

export interface PrescriptionMedicine {
  prescriptionNumber: number;
  medicineName: string;
  id: string;
}
