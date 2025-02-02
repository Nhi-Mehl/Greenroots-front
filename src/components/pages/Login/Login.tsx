import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

import Form from '../../Form/Form';
import Input from '../../Form/Input/Input';
import Button from '../../Form/Button/Button';
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
      isSuccess: isSuccessLogin,
    },
  ] = useLoginMutation();

  // Récupérer le profil utilisateur après connexion
  const { data: userProfile } = useGetProfileQuery(undefined, {
    skip: !accessToken, // Éviter de faire la requête si aucun token n'est disponible
  });

  /** ===================== 🟢 GESTION DU CHARGEMENT ===================== */
  useEffect(() => {
    if (isLoadingLogin) {
      // Afficher une alerte de chargement
      Swal.fire({
        title: 'Connexion en cours...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close(); // Fermer le chargement dès qu'il y a une réponse
    }
  }, [isLoadingLogin]);

  /** ===================== ✅ GESTION DU SUCCÈS ===================== */
  useEffect(() => {
    if (isSuccessLogin && accessToken) {
      dispatch(setToken(accessToken));
      dispatch(setUser(userProfile as GetProfileResponse));

      // Afficher une alerte de succès si la connexion est réussie
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: 'success',
        title: 'Connexion reussie',
        text: `Bienvenue ${userProfile?.first_name}`,
      });

      setTimeout(() => {
        navigate('/my-account');
      }, 1000);
    }
  }, [isSuccessLogin, accessToken, userProfile, dispatch, navigate]);

  /** ===================== ❌ GESTION DES ERREURS ===================== */
  useEffect(() => {
    if (isErrorLogin) {
      let errorMessage = 'Une erreur est survenue, veuillez réessayer.';
      if (loginError && 'data' in loginError) {
        errorMessage =
          (loginError as { data?: { message?: string } })?.data?.message ||
          errorMessage;
      }
      // Afficher une alerte d'erreur
      Swal.fire({
        icon: 'error',
        title: 'Erreur de connexion',
        text: errorMessage,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Réessayer',
      });
    }
  }, [isErrorLogin, loginError]);

  /** ===================== ✍️ GESTION DE LA SOUMISSION DU FORMULAIRE ===================== */
  // 📌 Utilisation de new FormData() pour récupérer les valeurs du formulaire

  //   ✅ Avantages :
  // ✔ Simple et concis → Pas besoin de gérer des useState() pour chaque champ.
  // ✔ Facile à utiliser avec des formulaires plus longs → FormData récupère tous les champs en une seule ligne.
  // ✔ Pratique si tu veux envoyer des fichiers → FormData gère aussi les fichiers (input type="file").

  // ❌ Inconvénients :
  // ❌ Moins réactif → Les valeurs ne sont lues qu'au moment de la soumission. Pas de mise à jour en temps réel.
  // ❌ Difficile à valider en direct → Impossible d'afficher un message d'erreur instantané si l'email est invalide avant l'envoi.

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Eviter le rechargement de la page
    e.preventDefault();
    // Créer un objet FormData à partir du formulaire
    const formData = new FormData(e.currentTarget);
    // Récupérer les informations du formulaire
    const credentials = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    // Exécuter la mutation login
    loginMutation(credentials);
  };

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
      <section className="p-6 bg-white shadow-md border-2 border-greenRegular rounded-lg lg:max-w-[600px] lg:mx-auto">
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
          <Button type="submit" variant="form">
            Se connecter
          </Button>
        </Form>
        <div className="flex flex-col items-center gap-2 mt-4">
          <Link to="/register" className="text-greenRegular">
            Cliquez ici pour vous inscrire
          </Link>
          <Link to="/forgot-password" className=" text-red-600">
            Mot de passe oublié
          </Link>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
