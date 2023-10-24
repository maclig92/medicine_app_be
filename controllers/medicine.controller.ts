import { Request, Response } from 'express';
import { MedicineRepository } from '../records/medicine.repository';
import { MedicineEntity, SimpleMedicineEntity } from '../types';
import { PrescriptionRepository } from '../records/prescription.repository';

export class MedicineController {
  static async getAll(req: Request, res: Response) {
    const meds = await MedicineRepository.getAll('', req.userId);

    res.json(
      meds.map(med => ({ id: med.id, name: med.name } as SimpleMedicineEntity)),
    );
  }

  static async search(req: Request, res: Response) {
    const meds = await MedicineRepository.getAll(req.params.name, req.userId);

    res.json(
      meds.map(med => ({ id: med.id, name: med.name } as SimpleMedicineEntity)),
    );
  }

  static async getMedicineAssignedToPrescription(req: Request, res: Response) {
    const meds = await PrescriptionRepository.getMedicineAssignedToPrescription(
      req.params.id,
    );

    if (!meds) return res.json(['brak przypisanych leków']);

    return res.json(meds.map(med => med.medicineName));
  }

  static async getOne(req: Request, res: Response) {
    const med = await MedicineRepository.getOne(req.params.id, req.userId);

    res.json(med);
  }

  static async insert(req: Request, res: Response) {
    const insertedMed: MedicineEntity = req.body;

    const insertedId = await MedicineRepository.insertOne(
      insertedMed,
      req.userId,
    );

    res.status(201).json(insertedId);
  }

  static async updateDosage(req: Request, res: Response) {
    const updateInfo = await MedicineRepository.updateDosage(
      req.params.id,
      req.body.dosage,
    );

    res.json(updateInfo);
  }

  static async deleteOne(req: Request, res: Response) {
    await MedicineRepository.deleteOne(req.params.id);

    res.status(204).end('deleted');
  }
}
