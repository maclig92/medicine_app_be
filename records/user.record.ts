import { nanoid } from 'nanoid';
import { EncryptedPESEL, UserEntity } from '../types';
import { pool } from '../utils/db';
import { FieldPacket } from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { decryptPESEL } from '../utils/decryptPESEL';
import { ValidationError } from '../utils/errors';

export class UserRecord {
  id?: string;
  username: string;
  email: string;
  peselNumber: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;

  // [key: string]: string | Date;
  // constructor(user: UserEntity) {
  //   for (const [key, val] of Object.entries(user)) {
  //     this[key] = val;
  //   }
  //   }

  constructor(user: UserEntity) {
    const { username, peselNumber, email, password } = user;

    if (!username) throw new ValidationError('Użytkownik musi posiadać nazwę!');

    if (username.length > 25)
      throw new ValidationError('Nazwa nie może być dłuższa niż 25 znaków');

    if (!email) throw new ValidationError('Użytkownik musi posiadać email!');

    if (email.length > 40)
      throw new ValidationError('Email nie może być dłuższy niż 40 znaków');

    if (!peselNumber)
      throw new ValidationError('Użytkownik musi posiadać PESEL!');

    if (!password) throw new ValidationError('Użytkownik musi posiadać hasło!');

    this.id = user.id;
    this.username = username;
    this.email = email;
    this.peselNumber = peselNumber;
    this.password = password;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  static async getOne(id: string): Promise<UserRecord | null> {
    const [results] = (await pool.execute(
      'SELECT * FROM `user` WHERE `id` = :id',
      { id },
    )) as [UserEntity[], FieldPacket[]];

    return results.length === 0 ? null : new UserRecord(results[0]);
  }

  async register(): Promise<UserRecord> {
    if (!this.id) this.id = nanoid(10);

    const [isExisted] = (await pool.execute(
      'SELECT * FROM `user` WHERE `id` = :id OR `username` = :username OR `email` = :email',
      { id: this.id, username: this.username, email: this.email },
    )) as [UserEntity[], FieldPacket[]];

    if (isExisted.length !== 0)
      throw new ValidationError('Użytownik już istnieje!');

    await pool.execute(
      'INSERT INTO `user` (id, username, password, email, peselNumber) VALUES (:id, :username, :password, :email, :peselNumber)',
      this,
    );
    return this;
  }

  static async login(
    username: string,
    password: string,
  ): Promise<string | false> {
    const [results] = (await pool.execute(
      'SELECT * FROM `user` WHERE username = :username',
      { username },
    )) as [UserEntity[], FieldPacket[]];

    if (results.length === 0) return false;

    const user = results[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) return false;

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return token;
  }

  async getPesel() {
    const encryptedPESEL: EncryptedPESEL = JSON.parse(this.peselNumber);

    return await decryptPESEL(
      this.password,
      encryptedPESEL.encrypted,
      encryptedPESEL.ivHex,
    );
  }
}
