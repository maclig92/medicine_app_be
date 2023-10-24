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

  [key: string]: string | Dosage | Date;

  constructor(obj: MedicineEntity) {
    if (!obj.name || obj.name.length > 100 || obj.name === '')
      throw new ValidationError(
        'Nazwa leku nie może być pusta albo mieć więcej jak 100 znaków!',
      );

    if (!obj.form) throw new ValidationError('Postać leku nie może być pusta!');

    if (
      !obj.dosage.dailyDoses ||
      !obj.dosage.doseQuantity ||
      !obj.dosage.doseUnit
    )
      throw new ValidationError('Lek musi posiadać dawkowanie!');

    if (obj.note.length > 1000)
      throw new ValidationError('Notatka może mieć maksymalnie 1000 znaków!');

    for (const [key, val] of Object.entries(obj)) {
      this[key] = val;
    }
  }
}
