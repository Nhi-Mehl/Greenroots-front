import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Form from '../../Form/Form';
import Input from '../../Form/Input/Input';
import { useLoginMutation } from '../../../store/features/auth/authApiSlice';
import { useGetProfileQuery } from '../../../store/features/user/userApiSlice';
import { useAppDispatch } from '../../../store/hooks';
import { setToken, setUser } from '../../../store/features/auth/authSlice';
import { GetProfileResponse } from '../../../@types/IUser';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Utilisation de la mutation login de Redux RTK Query
  const [
    loginMutation,
    {
      data: accessToken,
      isLoading: isLoadingLogin,
      isError: isErrorLogin,
      error: loginError,
    },
  ] = useLoginMutation();

  // Récupérer le profil utilisateur
  const { data: userProfile } = useGetProfileQuery(undefined, {
    skip: !accessToken, // Éviter de faire la requête si aucun token n'est disponible
  });

  // Gérer la redirection si un utilisateur est déjà connecté
  useEffect(() => {
    if (accessToken) {
      console.log('🚀 Redirection dans 1 seconde...');
      dispatch(setToken(accessToken));
      // Mettre à jour le state global Redux
      dispatch(setUser(userProfile as GetProfileResponse));
      setTimeout(() => {
        console.log('✅ Redirection en cours...');
        navigate('/my-account');
      }, 1000); // ⚡️ Ajout d’un délai de 1 seconde
    }
  }, [navigate, dispatch, accessToken, userProfile]);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêcher le rechargement de la page
    const formData = new FormData(e.currentTarget);

    const credentials = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    // Exécuter la mutation login
    loginMutation(credentials);
  };

  if (isLoadingLogin) {
    return 'Connexion en cours...';
  }

  if (isErrorLogin) {
    return (
      <p className="text-red-500 mt-4">
        Erreur :{' '}
        {(loginError as { response?: { data?: { message?: string } } })
          ?.response?.data?.message || 'Une erreur est survenue'}
      </p>
    );
  }

  return (
    <main className="px-4 py-10 min-h-screen sm:px-8 md:pt-24 sm:py-12">
      <section className="p-8 mb-10 border-2 border-solid border-greenRegular rounded-lg bg-white shadow-md lg:max-w-[900px] lg:mx-auto">
        <h1 className="h2-title text-3xl text-greenRegular text-center mb-6 lg:text-5xl">
          Connectez-vous
        </h1>
        <p className="text-sm text-justify sm:text-base md:text-lg lg:text-xl">
          Connectez-vous pour accéder à votre compte, suivre vos achats
          d&apos;arbres et voir l&apos;impact de vos contributions. Rejoignez la
          communauté et continuez à agir pour la reforestation.
        </p>
      </section>
      <section>
        <Form action="/login" onSubmit={handleSubmit}>
          <Input
            htmlFor="email"
            label="Email"
            type="email"
            name="email"
            id="email"
            placeholder="Votre email"
            required
          />
          <Input
            htmlFor="password"
            label="Mot de passe"
            type="password"
            name="password"
            id="password"
            placeholder="Votre mot de passe"
            required
          />
          <button
            className="btn-form mt-4"
            type="submit"
            disabled={isLoadingLogin}
          >
            Se connecter
          </button>
        </Form>
        <div className="flex flex-col items-center gap-2 mt-4">
          <Link to="/register" className="text-greenRegular">
            Cliquez ici pour vous inscrire
          </Link>
          {/* <Link to="/forgot-password" className=" text-red-600">
            Mot de passe oublié
          </Link> */}
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
