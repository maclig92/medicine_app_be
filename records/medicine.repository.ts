import { Dosage, MedicineDbRecord, MedicineEntity } from '../types';
import { pool } from '../utils/db';
import { ValidationError } from '../utils/errors';
import { MedicineRecord } from './medicine.record';
import { FieldPacket, OkPacket, ResultSetHeader } from 'mysql2';
import { nanoid } from 'nanoid';

export class MedicineRepository {
  static async getOne(id: string): Promise<MedicineRecord | null> {
    const [results] = (await pool.execute(
      'SELECT * FROM `medicine` WHERE `id` = :id',
      { id },
    )) as [MedicineDbRecord[], FieldPacket[]];

    const obj = results[0];

    return results.length === 0
      ? null
      : new MedicineRecord({
          id: obj.id,
          name: obj.name,
          form: obj.form,
          dosage: {
            dailyDoses: obj.numberOfDailyDoses,
            doseQuantity: obj.doseQuantity,
            doseUnit: obj.doseUnit,
          },
          startDate: obj.startDate,
          endDate: obj.endDate,
          note: obj.name,
        });
  }

  static async getAll(name: string): Promise<MedicineEntity[]> {
    const [results] = (await pool.execute(
      'SELECT * FROM `medicine` WHERE `name` LIKE :search',
      {
        search: `%${name}%`,
      },
    )) as [MedicineDbRecord[], FieldPacket[]];

    return results.map(
      obj =>
        new MedicineRecord({
          id: obj.id,
          name: obj.name,
          form: obj.form,
          dosage: {
            dailyDoses: obj.numberOfDailyDoses,
            doseQuantity: obj.doseQuantity,
            doseUnit: obj.doseUnit,
          },
          startDate: obj.startDate,
          endDate: obj.endDate,
          note: obj.name,
        }),
    );
  }

  static async insertOne(obj: MedicineEntity) {
    if (!obj.id) obj.id = nanoid(10);

    await pool.execute(
      'INSERT INTO `medicine`(`id`, `name`, `form`, `numberOfDailyDoses`, `doseUnit`, `doseQuantity`, `startDate`, `endDate`, `note`) VALUES (:id, :name, :form, :numberOfDailyDoses, :doseUnit, :doseQuantity, :startDate, :endDate, :note)',
      {
        id: obj.id,
        name: obj.name,
        form: obj.form,
        numberOfDailyDoses: obj.dosage.dailyDoses,
        doseUnit: obj.dosage.doseUnit,
        doseQuantity: obj.dosage.doseQuantity,
        startDate: obj.startDate ?? null,
        endDate: obj.endDate ?? null,
        note: obj.note ?? null,
      },
    );

    return obj.id;
  }

  static async updateOne(id: string, obj: Dosage) {
    await pool.execute(
      'UPDATE `medicine` SET  `numberOfDailyDoses` = :numberOfDailyDoses, `doseUnit` = :doseUnit, `doseQuantity` = :doseQuantity WHERE `id` = :id',
      {
        id,
        numberOfDailyDoses: obj.dailyDoses,
        doseUnit: obj.doseUnit,
        doseQuantity: obj.doseUnit,
      },
    );
  }

  static async deleteOne(id: string) {
    await pool.execute('DELETE FROM `medicine` WHERE `id` = :id', { id });
  }
}
