import { createCipheriv } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(require('crypto').scrypt);
const randomBytes = promisify(require('crypto').randomBytes);

export const encryptPESEL = async (pesel: string, password: string) => {
  const algorithm = 'aes-192-cbc';
  const salt = process.env.SALT;
  const key = await scrypt(password, salt, 24);
  const iv = await randomBytes(16);

  const cipher = createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(pesel.toString(), 'utf-8', 'hex');
  encrypted += cipher.final('hex');

  return {
    encrypted,
    ivHex: iv.toString('hex') as string,
  };
};
