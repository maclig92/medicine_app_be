import { Router } from 'express';
import { PrescriptionRepository } from '../records/prescription.repository';

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
  });
