import { Router } from 'express';
import { MedicineController } from '../controllers/medicine.controller';

export const medicineRouter = Router();

medicineRouter
  .get('/', MedicineController.getAll)
  .post('/', MedicineController.insert)
  .get('/search/:name', MedicineController.search)
  .get(
    '/prescription/:id',
    MedicineController.getMedicineAssignedToPrescription,
  )
  .get('/:id', MedicineController.getOne)
  .patch('/:id', MedicineController.updateDosage)
  .delete('/:id', MedicineController.deleteOne);
