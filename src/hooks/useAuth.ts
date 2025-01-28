import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useLoginMutation, useGetProfileQuery } from '../../api/apiSlice';
import {
  login,
  logout,
  updateProfile,
  selectCurrentUser,
} from '../../features/auth/authSlice';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [loginMutation, loginState] = useLoginMutation();

  // Récupérer le profil utilisateur
  const { data: profile, isSuccess: isProfileFetched } = useGetProfileQuery(
    undefined,
    {
      skip: !user?.token, // Éviter de faire la requête si aucun token n'est disponible
    }
  );

  // Mettre à jour l'utilisateur dans le store après avoir récupéré le profil
  useEffect(() => {
    if (isProfileFetched && profile) {
      dispatch(updateProfile(profile));
    }
  }, [isProfileFetched, profile, dispatch]);

  // Gérer le login
  const loginUser = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await loginMutation(credentials).unwrap();
      dispatch(login(response)); // Stocker le token dans Redux
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  // Gérer la déconnexion
  const logoutUser = () => {
    dispatch(logout());
  };

  return { user, loginUser, logoutUser, loginState };
};

export default useAuth;
