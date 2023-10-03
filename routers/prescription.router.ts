import { Router } from 'express';
import { PrescriptionRepository } from '../records/prescription.repository';
import { PrescriptionEntity } from '../types';

export const prescriptionRouter = Router();

prescriptionRouter
  .get('/', async (req, res) => {
    res.json(await PrescriptionRepository.getAll());
  })
  .get('/medicine/:id', async (req, res) => {
    res.json(
      await PrescriptionRepository.getPrescriptionAssignedToMedicine(
        req.params.id,
      ),
    );
  })
  .get('/:id', async (req, res) => {
    res.json(await PrescriptionRepository.getOne(req.params.id));
  })
  .post('/', async (req, res) => {
    const { prescriptionNumber, issueDate, isYearly, isAntibiotic } =
      req.body as PrescriptionEntity;

    const insertedId = await PrescriptionRepository.insertOne({
      prescriptionNumber: Number(prescriptionNumber),
      issueDate: new Date(issueDate),
      isYearly,
      isAntibiotic,
    });

    return res.json(insertedId);
  })
  .patch('/:id/:medicineId', async (req, res) => {
    const { id, medicineId } = req.params;
    await PrescriptionRepository.assignMedicineToPrescription(id, medicineId);
    res.json(req.params);
  });
