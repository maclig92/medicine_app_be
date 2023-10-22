import { PrescriptionEntity } from '../types';
import { ValidationError } from '../utils/errors';
import { isFourDigitNumber } from '../utils/isFourDigitNumber';
import { countExpireDate } from '../utils/countExpireDate';

export class PrescriptionRecord implements PrescriptionEntity {
  public id?: string;
  public prescriptionNumber: string;
  public issueDate: Date;
  public isYearly?: boolean = false;
  public isAntibiotic?: boolean = false;
  public expireDate: Date;
  public ownerId?: string;

  [key: string]: string | number | boolean | Date | (() => void);

  constructor(obj: PrescriptionEntity) {
    const { prescriptionNumber, issueDate } = obj;

    if (!prescriptionNumber)
      throw new ValidationError('Recepta musi mieć numer');

    if (prescriptionNumber.length !== 4)
      throw new ValidationError('Recepta musi być liczbą czterocyfrową');

    if (!issueDate)
      throw new ValidationError('Recepta musi mieć datę wystawienia');

    for (const [key, val] of Object.entries(obj)) {
      this[key] = val;
    }

    this.setExpireDate();
  }

  private setExpireDate(): void {
    this.expireDate = this.isAntibiotic
      ? countExpireDate(this.issueDate, 7)
      : this.isYearly
      ? countExpireDate(this.issueDate, 365)
      : countExpireDate(this.issueDate, 30);
  }
}
