export interface EncryptedPESEL {
  encrypted: string;
  ivHex: string;
}

export interface UserEntity {
  id?: string;
  username: string;
  email: string;
  PESELnumber: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
