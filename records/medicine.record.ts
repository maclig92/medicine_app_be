import { Dosage, MedicineEntity } from '../types';
import { ValidationError } from '../utils/errors';

export class MedicineRecord implements MedicineEntity {
  public id?: string;
  public name: string;
  public form: string;
  public dosage: Dosage;
  public startDate?: Date;
  public endDate?: Date;
  public note?: string;
  public ownerId?: string;

  [key: string]: string | number | Dosage | Date;

  constructor(obj: MedicineEntity) {
    if (!obj.name || obj.name.length > 100 || obj.name === '')
      throw new ValidationError(
        'Medicine name cannot be empty or be longer than 100 charakters.',
      );

    if (!obj.form) throw new ValidationError('Medicine form cannot be empty.');

    if (
      !obj.dosage.dailyDoses ||
      !obj.dosage.doseQuantity ||
      !obj.dosage.doseUnit
    )
      throw new ValidationError('Medicine dosage cannot be empty.');

    if (obj.note.length > 1000)
      throw new ValidationError('Note cannot be longer than 1000 charakters.');

    for (const [key, val] of Object.entries(obj)) {
      this[key] = val;
    }
  }
}
