import { PrescriptionRecord } from '../records/prescription.record';
import { PrescriptionRepository } from '../records/prescription.repository';
import { PrescriptionEntity } from '../types';
import { pool } from '../utils/db';

const exampleObj: PrescriptionEntity = {
  prescriptionNumber: 9999,
  issueDate: new Date('2023-10-01'),
};

beforeAll(async () => {
  await PrescriptionRepository.insertOne({ ...exampleObj, id: 'test' });
});

afterAll(async () => {
  await PrescriptionRepository.deleteOne('test');
  await pool.end();
});

test('Repository return data from db for one entry', async () => {
  const obj = await PrescriptionRepository.getOne('test');

  console.log(obj);

  expect(obj).toBeDefined();
  expect(obj).toBeInstanceOf(PrescriptionRecord);
});

test('Repository return all prescriptions', async () => {
  const result = await PrescriptionRepository.getAll();

  expect(result).toBeDefined();
  expect(result.at(0)).toBeInstanceOf(PrescriptionRecord);
  expect(result.length).toBeGreaterThanOrEqual(1);
});

test('Repository can delete data', async () => {
  await PrescriptionRepository.insertOne({
    ...exampleObj,
    id: 'del_test',
  });
  const inserted = await PrescriptionRepository.getOne('del_test');

  expect(inserted).toBeDefined();

  await PrescriptionRepository.deleteOne('del_test');

  const deleted = await PrescriptionRepository.getOne('del_test');

  expect(deleted).toBeNull();
});
