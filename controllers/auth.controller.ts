import { Request, Response } from 'express';
import { UserRecord } from '../records/user.record';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { EncryptedPESEL, UserEntity } from '../types';
import bcrypt from 'bcrypt';
import { encryptPESEL } from '../utils/encryptPESEL';
import { decryptPESEL } from '../utils/decryptPESEL';

export class AuthController {
  static async register(req: Request, res: Response) {
    console.log(req.body);
    try {
      const { username, password, email, PESELnumber } = req.body as UserEntity;
      const hashedPwd = await bcrypt.hash(password, 10);
      const encryptedPESEL = JSON.stringify(
        await encryptPESEL(PESELnumber, hashedPwd),
      );
      const user = new UserRecord({
        username,
        password: hashedPwd,
        email,
        PESELnumber: encryptedPESEL,
      });
      res.json(await user.register());
    } catch (e) {
      console.error(e);
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const { username, pwd } = req.body;

      const token = await UserRecord.login(username, pwd);

      if (!token) res.status(401).json({ message: 'Invalid credentials' });

      res
        .status(200)
        .cookie('access_token', token, { httpOnly: true })
        .json({ token });
    } catch (e) {}
  }

  static verify(req: Request, res: Response) {
    try {
      const { token } = req.body;

      const decoded: JwtPayload | string = jwt.verify(
        token,
        process.env.JWT_SECRET,
      );

      if (typeof decoded === 'string')
        return res.status(401).json({ message: 'Unauthorized' });

      res.json(true);
    } catch (e) {}
  }

  static async getUserPesel(req: Request, res: Response) {
    const user = new UserRecord(await UserRecord.getOne(req.params.id));

    const PESELnumber = await user.getPesel();

    res.status(200).json(PESELnumber);
  }
}
