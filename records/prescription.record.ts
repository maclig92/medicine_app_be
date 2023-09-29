import { PrescriptionEntity } from '../types';
import { ValidationError } from '../utils/errors';
import { isFourDigitNumber } from '../utils/isFourDigitNumber';
import { setExpireDate } from '../utils/setExpireDate';

export class PrescriptionRecord implements PrescriptionEntity {
  public prescriptionNumber: number;
  public issueDate: Date;
  public isYearly?: boolean = false;
  public isAntibiotic?: boolean = false;
  public exipireDate: Date;

  [key: string]: number | boolean | Date;

  constructor(obj: PrescriptionEntity) {
    const { prescriptionNumber, issueDate } = obj;

    if (!prescriptionNumber)
      throw new ValidationError('Recepta musi mieć numer');

    if (!isFourDigitNumber(prescriptionNumber))
      throw new ValidationError('Recepta musi być liczbą czterocyfrową');

    if (!issueDate)
      throw new ValidationError('Recepta musi mieć datę wystawienia');

    for (const [key, val] of Object.entries(obj)) {
      this[key] = val;

      this.exipireDate = this.isAntibiotic
        ? setExpireDate(this.issueDate, 7)
        : this.isYearly
        ? setExpireDate(this.issueDate, 365)
        : setExpireDate(this.issueDate, 30);
    }
  }
}
