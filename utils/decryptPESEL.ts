import { createDecipheriv } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(require('crypto').scrypt);

export const decryptPESEL = async (
  password: string,
  data: string,
  ivHex: string,
) => {
  const algorithm = 'aes-192-cbc';
  const salt = process.env.SALT;

  const key = await scrypt(password, salt, 24);
  const iv = Buffer.from(ivHex, 'hex');

  const decipher = createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(data, 'hex', 'utf-8');

  decrypted += decipher.final('utf-8');

  return decrypted;
};
