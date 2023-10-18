import { Request, Response } from 'express';
import { PrescriptionRepository } from '../records/prescription.repository';
import { PrescriptionEntity } from '../types';

export class PrescriptionController {
  static async getAll(req: Request, res: Response) {
    res.json(await PrescriptionRepository.getAll(req.userId));
  }

  static async getPrescriptionAssignedToMedicine(req: Request, res: Response) {
    res.json(
      await PrescriptionRepository.getPrescriptionAssignedToMedicine(
        req.params.id,
        req.userId,
      ),
    );
  }

  static async getOne(req: Request, res: Response) {
    res.json(await PrescriptionRepository.getOne(req.params.id, req.userId));
  }

  static async insert(req: Request, res: Response) {
    const { prescriptionNumber, issueDate, isYearly, isAntibiotic } =
      req.body as PrescriptionEntity;

    const insertedId = await PrescriptionRepository.insertOne(
      {
        prescriptionNumber: Number(prescriptionNumber),
        issueDate: new Date(issueDate),
        isYearly,
        isAntibiotic,
      },
      req.userId,
    );

    return res.status(201).json(insertedId);
  }

  static async assignMedicineToPrescription(req: Request, res: Response) {
    const { id, medicineId } = req.params;
    await PrescriptionRepository.assignMedicineToPrescription(id, medicineId);
    res.json(req.params);
  }

  static async deleteOne(req: Request, res: Response) {
    await PrescriptionRepository.deleteOne(req.params.id);

    res.status(204).end('deleted');
  }
}
