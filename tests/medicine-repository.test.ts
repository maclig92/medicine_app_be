import { nanoid } from 'nanoid';
import { pool } from '../utils/db';
import { MedicineEntity } from '../types';
import { MedicineRepository } from '../records/medicine.repository';
import { MedicineRecord } from '../records/medicine.record';

const defaultObj: MedicineEntity = {
  name: 'test_test',
  form: 'test',
  dosage: {
    dailyDoses: 1,
    doseQuantity: 1,
    doseUnit: 'test',
  },
  startDate: new Date(),
  note: 'test note',
};

afterAll(async () => {
  await pool.execute('DELETE FROM `medicine` WHERE `name` = "test_test"');
  await pool.end();
});

test('Repository return data from db for one entry', async () => {
  const testObj = await MedicineRepository.getOne('testoweId');

  expect(testObj).toBeInstanceOf(MedicineRecord);
});

test('Repository return all medicines from db when get empty string', async () => {
  const medicines = await MedicineRepository.getAll('');

  expect(medicines).toBeDefined();
  expect(medicines.length).toBe(4);
});
test('Repository return searching medicines', async () => {
  const medicines = await MedicineRepository.getAll('nazwa');

  expect(medicines).toBeDefined();
  expect(medicines[0].name).toBe('Testowa Nazwa');
});

test('Repository inserts', async () => {
  const inserted = await MedicineRepository.insertOne(defaultObj);

  expect(inserted.length).toBe(10);
});

test('Repository deletes', async () => {
  defaultObj.id = nanoid(10);
  const inserted = await MedicineRepository.insertOne(defaultObj);
  const testObj = await MedicineRepository.getOne(inserted);

  expect(testObj).toBeDefined();

  await MedicineRepository.deleteOne(testObj.id);
  const testObj2 = await MedicineRepository.getOne(inserted);

  expect(testObj2).toBeNull();
});
