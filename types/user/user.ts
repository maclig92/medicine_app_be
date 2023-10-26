export interface EncryptedPESEL {
  encrypted: string;
  ivHex: string;
}

export interface UserEntity {
  id?: string;
  username: string;
  email: string;
  peselNumber: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
