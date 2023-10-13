import { Router } from 'express';
import bcrypt from 'bcrypt';
import { UserEntity } from '../types';
import { UserRecord } from '../records/user.record';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/config';

export const authRouter = Router();

authRouter
  .post('/register', async (req, res) => {
    const { username, password, email } = req.body as UserEntity;
    const hashedPwd = await bcrypt.hash(password, 10);
    const user = new UserRecord({ username, password: hashedPwd, email });
    res.json(await user.register());
  })
  .post('/login', async (req, res) => {
    const { username, pwd } = req.body;

    const token = await UserRecord.login(username, pwd);

    if (!token) res.status(401).json({ message: 'Invalid credentials' });

    res
      .status(200)
      .cookie('access_token', token, { httpOnly: true })
      .json({ token });
  })
  .post('/verify', (req, res) => {
    const { token } = req.body;

    const decoded: JwtPayload | string = jwt.verify(
      token,
      process.env.JWT_SECRET,
    );

    if (typeof decoded === 'string')
      return res.status(401).json({ message: 'Unauthorized' });

    res.json(true);
  });
