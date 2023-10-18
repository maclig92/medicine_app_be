import { Router } from 'express';
import { PrescriptionController } from '../controllers/prescription.controller';

export const prescriptionRouter = Router();

prescriptionRouter
  .get('/', PrescriptionController.getAll)
  .post('/', PrescriptionController.insert)
  .get(
    '/medicine/:id',
    PrescriptionController.getPrescriptionAssignedToMedicine,
  )
  .patch(
    '/:id/:medicineId',
    PrescriptionController.assignMedicineToPrescription,
  )
  .get('/:id', PrescriptionController.getOne)
  .delete('/:id', PrescriptionController.deleteOne);
