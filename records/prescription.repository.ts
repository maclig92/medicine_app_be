import { FieldPacket, ResultSetHeader } from 'mysql2';
import {
  MedicineDbEntity,
  PrescriptionEntity,
  PrescriptionMedicine,
} from '../types';
import { pool } from '../utils/db';
import { PrescriptionRecord } from './prescription.record';
import { nanoid } from 'nanoid';
import { ValidationError } from '../utils/errors';

export class PrescriptionRepository {
  static async getAll(): Promise<PrescriptionEntity[]> {
    const [results] = (await pool.execute('SELECT * FROM `prescription`')) as [
      PrescriptionEntity[],
      FieldPacket[],
    ];

    return results.map(item => new PrescriptionRecord(item));
  }

  static async getOne(id: string): Promise<PrescriptionEntity | null> {
    const [results] = (await pool.execute(
      'SELECT * FROM `prescription` WHERE `id` = :id',
      { id },
    )) as [PrescriptionEntity[], FieldPacket[]];

    return results.length === 0 ? null : new PrescriptionRecord(results[0]);
  }

  static async insertOne(obj: PrescriptionEntity) {
    if (!obj.id) obj.id = nanoid(10);

    const inserted = new PrescriptionRecord(obj);

    console.log(inserted);

    await pool.execute(
      'INSERT INTO `prescription`(`id`, `prescriptionNumber`, `issueDate`, `isYearly`, `isAntibiotic`) VALUES (:id, :prescriptionNumber, :issueDate,  :isYearly, :isAntibiotic)',
      {
        id: inserted.id,
        prescriptionNumber: inserted.prescriptionNumber,
        issueDate: inserted.issueDate,
        isYearly: inserted.isYearly,
        isAntibiotic: inserted.isAntibiotic,
      },
    );

    return obj.id;
  }

  static async deleteOne(id: string) {
    await pool.execute('DELETE FROM `prescription` WHERE `id` = :id', { id });
  }

  static async assignMedicineToPrescription(
    prescriptionId: string,
    medicineId: string,
  ) {
    const [prescriptionResult] = (await pool.execute(
      'SELECT * FROM `prescription` WHERE `id` = :prescriptionId',
      { prescriptionId },
    )) as [PrescriptionEntity[], FieldPacket[]];

    if (prescriptionResult.length === 0)
      throw new ValidationError('Recepta o podanym ID nie istnieje.');

    const [medicineResult] = (await pool.execute(
      'SELECT * FROM `medicine` WHERE `id` = :medicineId',
      { medicineId },
    )) as [MedicineDbEntity[], FieldPacket[]];

    if (medicineResult.length === 0)
      throw new ValidationError('Lek o podanym ID nie istnieje.');

    const [{ affectedRows, warningStatus }] =
      await pool.execute<ResultSetHeader>(
        'INSERT INTO `prescription_medicine` (`prescription_id`, `medicine_id`) VALUES (:prescriptionId, :medicineId)',
        { prescriptionId, medicineId },
      );

    if (affectedRows !== 1 || warningStatus !== 0)
      throw new ValidationError(
        'Przypisanie leku do recepty nie powiodło się.',
      );
  }

  static async getPrescriptionAssignedToMedicine(
    medicineId: string,
  ): Promise<PrescriptionMedicine[] | null> {
    const [results] = (await pool.execute(
      'SELECT `prescription`.`prescriptionNumber`, `prescription`.`id`, `medicine`.`name` AS `medicineName` FROM `prescription` JOIN `medicine_prescription` ON `prescription`.`id` = `medicine_prescription`.`prescriptionId` JOIN `medicine` ON `medicine_prescription`.`medicineId` = `medicine`.`id` WHERE `medicine`.`id` = :medicineId',
      { medicineId },
    )) as [PrescriptionMedicine[], FieldPacket[]];

    if (results.length === 0) return null;

    return results;
  }

  static async getMedicineAssignedToPrescription(
    prescriptionId: string,
  ): Promise<PrescriptionMedicine[] | null> {
    const [results] = (await pool.execute(
      'SELECT `prescription`.`prescriptionNumber`, `medicine`.`name` AS `medicineName`, `medicine`.`id` FROM `medicine` JOIN `medicine_prescription` ON `medicine`.`id` = `medicine_prescription`.`medicineId` JOIN `prescription` ON `medicine_prescription`.`prescriptionId` = `prescription`.`id` WHERE `prescription`.`id`  = :prescriptionId',
      { prescriptionId },
    )) as [PrescriptionMedicine[], FieldPacket[]];

    if (results.length === 0) return null;

    return results;
  }
}
