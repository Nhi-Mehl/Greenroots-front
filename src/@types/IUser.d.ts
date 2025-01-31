export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  address: string;
  zip_code: string;
  city: string;
  country: string;
  phone_number: string;
  email: string;
  password: string;
  confirmation: string;
}

// Types données de la réponse de la récupération du profil
export type GetProfileResponse = Omit<IUser, 'password' | 'confirmation'>;

// Types données de la requête de mise à jour du profil
export type UpdateProfileRequest = Required<Pick<IMember, 'id'>> &
  Partial<Omit<IUser, 'password' | 'confirmation' | 'role'>>;

// Types données de la réponse de mise à jour du profil
export type UpdateProfileResponse = {
  sucess: boolean;
  message: string;
  data: Omit<IUser, 'confirmation' | 'password'> & {
    createdAt: string;
    updatedAt: string;
  };
};
