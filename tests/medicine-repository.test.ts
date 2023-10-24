import { nanoid } from 'nanoid';
import { pool } from '../utils/db';
import { MedicineEntity } from '../types';
import { MedicineRepository } from '../repositories/medicine.repository';
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

beforeAll(async () => {
  await MedicineRepository.insertOne(
    { ...defaultObj, id: 'testoweId' },
    'TVP8eMlrGx',
  );
});

afterAll(async () => {
  await pool.execute('DELETE FROM `medicine` WHERE `name` = "test_test"');
  await pool.end();
});

test('Repository return data from db for one entry', async () => {
  const testObj = await MedicineRepository.getOne('testoweId', 'TVP8eMlrGx');

  expect(testObj).toBeInstanceOf(MedicineRecord);
});

test('Repository return all medicines from db when get empty string', async () => {
  const medicines = await MedicineRepository.getAll('', 'TVP8eMlrGx');

  expect(medicines).toBeDefined();
  expect(medicines.length).toBeGreaterThanOrEqual(1);
});

test('Repository inserts', async () => {
  const inserted = await MedicineRepository.insertOne(defaultObj, 'TVP8eMlrGx');

  expect(inserted.length).toBe(10);
});

test('Repository return searching medicines', async () => {
  const medicines = await MedicineRepository.getAll('test_', 'TVP8eMlrGx');

  expect(medicines).toBeDefined();
  expect(medicines.at(-1).name).toBe('test_test');
});

test('Repository deletes', async () => {
  defaultObj.id = nanoid(10);
  const inserted = await MedicineRepository.insertOne(defaultObj, 'TVP8eMlrGx');
  const testObj = await MedicineRepository.getOne(inserted, 'TVP8eMlrGx');

  expect(testObj).toBeDefined();
  expect(testObj).toBeInstanceOf(MedicineRecord);

  await MedicineRepository.deleteOne(testObj.id);
  const testObj2 = await MedicineRepository.getOne(inserted, 'TVP8eMlrGx');

  expect(testObj2).toBeNull();
});
