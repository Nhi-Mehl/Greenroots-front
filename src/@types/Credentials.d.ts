import { IUser } from './IUser';

// Types données utilisateurs au mont de l'inscription
export type SignUpRequest = Omit<IUser, 'id' | 'role'>;

// Types données de la réponse de l'inscription
export type SignUpResponse = { message: string };

// Types données de la requête de connexion
export type LoginRequest = Pick<IUser, 'email' | 'password'>;

// Types données de la réponse de la connexion
export type LoginResponse = { accessToken: string };

// Types données de la réponse de la suppression profil utilisateur
export type DeleteUserResponse = { success: boolean; message: string };
