import { Dosage, MedicineEntity } from '../types';
import { pool } from '../utils/db';
import { MedicineRecord } from './medicine.record';
import { FieldPacket } from 'mysql2';
import { nanoid } from 'nanoid';

export class MedicineRepository {
  static async getOne(id: string): Promise<MedicineRecord | null> {
    const [results] = (await pool.execute(
      'SELECT * FROM `medicie` WHERE `id` = :id',
      { id },
    )) as [MedicineRecord[], FieldPacket[]];

    return results.length === 0 ? null : new MedicineRecord(results[0]);
  }

  static async getAll(name: string): Promise<MedicineEntity[]> {
    const [results] = (await pool.execute(
      'SELECT * FROM `ads` WHERE `name` LIKE :search',
      {
        search: `%${name}%`,
      },
    )) as [MedicineRecord[], FieldPacket[]];

    return results.map(result => new MedicineRecord(result));
  }

  static async insertOne(obj: MedicineEntity) {
    if (!obj.id) obj.id = nanoid(10);
    const [results] = (await pool.execute(
      'INSERT INTO `medicine`(`id`, `name`, `form`, `numberOfDailyDoses`, `doseUnit`, `doseQuantity`, `StartDate`, `EndDate`, `note`) VALUES (:id, :name, :form, :numberOfDailyDoses, :doseUnit, :doseQuantity, :startDate, :endDate, :note)',
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
    )) as [MedicineEntity[], FieldPacket[]];

    return results[0].id;
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
