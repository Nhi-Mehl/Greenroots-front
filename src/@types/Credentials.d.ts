import { IUser } from './IUser';

export type SignUpRequest = Omit<IUser, 'id' | 'role'>;

export type SignUpResponse = { message: string };
export type LoginRequest = {
  email: string;
  password: string;
};
export type LoginResponse = { token: string };

export type GetProfileResponse = Omit<IUser, 'password' | 'confirmation'>;
