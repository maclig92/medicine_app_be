import { Router } from 'express';
import { MedicineRepository } from '../records/medicine.repository';
import { MedicineEntity, SimpleMedicineEntity } from '../types';
import { PrescriptionRepository } from '../records/prescription.repository';

export const medicineRouter = Router();

medicineRouter
  .get('/', async (req, res) => {
    const meds = await MedicineRepository.getAll('');

    res.json(
      meds.map(med => ({ id: med.id, name: med.name } as SimpleMedicineEntity)),
    );
  })
  .get('/search/:name', async (req, res) => {
    const meds = await MedicineRepository.getAll(req.params.name);

    res.json(
      meds.map(med => ({ id: med.id, name: med.name } as SimpleMedicineEntity)),
    );
  })
  .get('/prescription/:id', async (req, res) => {
    const meds = await PrescriptionRepository.getMedicineAssignedToPrescription(
      req.params.id,
    );

    if (!meds) return res.json(['brak przypisanych leków']);

    return res.json(meds.map(med => med.medicineName));
  })
  .get('/:id', async (req, res) => {
    const med = await MedicineRepository.getOne(req.params.id);

    res.json(med);
  })
  .post('/', async (req, res) => {
    const insertedMed: MedicineEntity = req.body;

    const insertedId = await MedicineRepository.insertOne(insertedMed);

    res.json(insertedId);
  })
  .patch('/:id', async (req, res) => {
    const updateInfo = await MedicineRepository.updateDosage(
      req.params.id,
      req.body.dosage,
    );

    res.json(updateInfo);
  });
