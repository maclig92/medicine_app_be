import { PrescriptionRecord } from '../records/prescription.record';
import { PrescriptionEntity } from '../types';

const exampleObj: PrescriptionEntity = {
  prescriptionNumber: '1234',
  issueDate: new Date('2023-01-01'),
  isYearly: false,
  isAntibiotic: false,
};

test('Record can build proper PrescriptionRecord', () => {
  const obj = new PrescriptionRecord(exampleObj);

  expect(obj).toBeDefined();
  expect(obj).toBeInstanceOf(PrescriptionRecord);
});

test('Record can count proper expireDate', () => {
  const obj = new PrescriptionRecord({ ...exampleObj, isAntibiotic: true });
  const obj2 = new PrescriptionRecord({ ...exampleObj, isYearly: true });
  const obj3 = new PrescriptionRecord({
    ...exampleObj,
    isYearly: true,
    isAntibiotic: true,
  });
  const obj4 = new PrescriptionRecord(exampleObj);

  expect(obj.expireDate.toLocaleDateString()).toBe('8.01.2023');
  expect(obj2.expireDate.toLocaleDateString()).toBe('1.01.2024');
  expect(obj3.expireDate.toLocaleDateString()).toBe('8.01.2023');
  expect(obj4.expireDate.toLocaleDateString()).toBe('31.01.2023');
});

test('Record throws when invalid prescriptionNumber', () => {
  expect(() => {
    new PrescriptionRecord({
      ...exampleObj,
      prescriptionNumber: '123',
    });
  }).toThrow();

  expect(() => {
    new PrescriptionRecord({
      ...exampleObj,
      prescriptionNumber: '12345',
    });
  }).toThrow();
});
