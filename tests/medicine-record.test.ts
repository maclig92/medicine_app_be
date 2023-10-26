import { MedicineRecord } from '../records/medicine.record';
import { MedicineEntity } from '../types';
import { nanoid } from 'nanoid';
import { longString } from '../utils/longString';

const defaultObj: MedicineEntity = {
  id: nanoid(10),
  name: 'test',
  form: 'test',
  dosage: {
    dailyDoses: 1,
    doseQuantity: 1,
    doseUnit: 'test',
  },
  startDate: new Date(),
  note: 'test note',
};

test('Record can build proper MedicineRecord', () => {
  const testObj = new MedicineRecord(defaultObj);

  expect(testObj).toBeInstanceOf(MedicineRecord);
  expect(testObj.id.length).toBe(10);
});

test('Record throws when empty name', () => {
  expect(() => {
    const testObj = new MedicineRecord({ ...defaultObj, name: undefined });
  }).toThrow();
});

test('Record throws when empty form', () => {
  expect(() => {
    const testObj = new MedicineRecord({ ...defaultObj, form: '' });
  }).toThrow();
});

test('Record throws when empty dosage', () => {
  expect(() => {
    const testObj = new MedicineRecord({
      ...defaultObj,
      dosage: {
        dailyDoses: 0,
        doseQuantity: 0,
        doseUnit: '',
      },
    });
  }).toThrow();
});

test('Record throws when note have more than 1000 char.', () => {
  expect(() => {
    const testObj = new MedicineRecord({ ...defaultObj, note: longString });
  }).toThrow();
});
