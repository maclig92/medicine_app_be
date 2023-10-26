import { UserRecord } from '../records/user.record';
import { UserEntity } from '../types';
import bcrypt from 'bcrypt';
import { encryptPESEL } from '../utils/encryptPESEL';
import { pool } from '../utils/db';
import { longString } from '../utils/longString';

const defaultUser: UserEntity = {
  id: 'test_id',
  username: 'username',
  email: 'email@email.com',
  peselNumber: '01234567890',
  password: 'password',
};

afterAll(async () => {
  await pool.execute(
    'DELETE FROM `user` WHERE `username` = "username" OR `email` = "email@email.com"',
  );
  await pool.end();
});

test('User can validate data', () => {
  expect(() => new UserRecord({ ...defaultUser, username: '' })).toThrow();
  expect(() => new UserRecord({ ...defaultUser, email: '' })).toThrow();
  expect(() => new UserRecord({ ...defaultUser, peselNumber: '' })).toThrow();
  expect(() => new UserRecord({ ...defaultUser, password: '' })).toThrow();
  expect(() => new UserRecord({ ...defaultUser, email: longString })).toThrow();
  expect(
    () => new UserRecord({ ...defaultUser, username: longString }),
  ).toThrow();
});

test('User can be register', async () => {
  const hashedPwd = await bcrypt.hash(defaultUser.password, 10);
  const encryptedPESEL = JSON.stringify(
    await encryptPESEL(defaultUser.peselNumber, defaultUser.password),
  );

  const user = new UserRecord({
    ...defaultUser,
    password: hashedPwd,
    peselNumber: encryptedPESEL,
  });

  const result = await user.register();

  expect(result).toBeInstanceOf(UserRecord);
});

test('User can login', async () => {
  const result = await UserRecord.login('username', 'password');

  expect(result).not.toBe(false);
});

test('User throws when invalid credentials', async () => {
  const result = await UserRecord.login('username', 'wrongPwd');
  const result2 = await UserRecord.login('wrongUsername', 'password');

  expect(result).toBe(false);
  expect(result2).toBe(false);
});

test('User cannot register the same data twice', async () => {
  try {
    const hashedPwd = await bcrypt.hash(defaultUser.password, 10);
    const encryptedPESEL = JSON.stringify(
      await encryptPESEL(defaultUser.peselNumber, defaultUser.password),
    );
    const user = new UserRecord({
      ...defaultUser,
      password: hashedPwd,
      peselNumber: encryptedPESEL,
    });

    await user.register();
  } catch (error) {
    expect(error).toBeDefined();
  }
});
