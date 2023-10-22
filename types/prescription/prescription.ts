export interface PrescriptionEntity {
  id?: string;
  prescriptionNumber: string;
  issueDate: Date;
  isYearly?: boolean;
  isAntibiotic?: boolean;
  expireDate?: Date;
  ownerId?: string;
}

export interface PrescriptionMedicine {
  prescriptionNumber: number;
  medicineName: string;
  id: string;
}
