import { nanoid } from 'nanoid';
import { UserEntity } from '../types';
import { pool } from '../utils/db';
import { FieldPacket } from 'mysql2/promise';
import { ValidationError } from '../utils/errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export class UserRecord {
  id?: string;
  username: string;
  email: string;
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
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }

  static async getOne(id: string): Promise<UserEntity | null> {
    const [results] = (await pool.execute(
      'SELECT * FROM `user` WHERE `id` = :id',
      { id },
    )) as [UserEntity[], FieldPacket[]];

    return results.length === 0 ? null : new UserRecord(results[0]);
  }

  async register(): Promise<UserEntity | { message: string }> {
    if (!this.id) this.id = nanoid(10);

    const [isExisted] = (await pool.execute(
      'SELECT * FROM `user` WHERE `id` = :id OR `username` = :username OR `email` = :email',
      { id: this.id, username: this.username, email: this.email },
    )) as [UserEntity[], FieldPacket[]];

    if (isExisted.length !== 0) return { message: 'User already exists!' };

    await pool.execute(
      'INSERT INTO `user` (id, username, password, email) VALUES (:id, :username, :password, :email)',
      this,
    );
    return this;
  }

  static async login(username: string, password: string) {
    const [results] = (await pool.execute(
      'SELECT * FROM `user` WHERE username = :username',
      { username },
    )) as [UserEntity[], FieldPacket[]];

    if (results.length === 0) return false;

    const user = results[0];

    // console.log(user);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) return false;

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return token;
  }
}
