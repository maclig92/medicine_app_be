export interface PrescriptionEntity {
  prescriptionNumber: number;
  issueDate: Date;
  isYearly?: boolean;
  isAntibiotic?: boolean;
  expireDate?: Date;
}
