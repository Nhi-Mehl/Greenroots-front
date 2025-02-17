import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaLongArrowAltLeft } from 'react-icons/fa';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  clearAuth,
  selectCurrentUser,
  setUser,
} from '../../../store/features/auth/authSlice';
import {
  useDeleteAccountMutation,
  useGetProfileQuery,
} from '../../../store/features/user/userApiSlice';
// import apiSlice from '../../../store/api/apiSlice';
import Button from '../../Form/Button/Button';

function ProfilDetailsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isUserDeleted, setIsUserDeleted] = useState(false);

  // Récupérer l'utilisateur connecté de la store Redux
  const currentUser = useAppSelector(selectCurrentUser);
  // Récupérer les informations utilisateur via RTK Query
  const {
    data: profileData,
    isLoading: isLoadingProfile,
    isError: isErrorProfile,
  } = useGetProfileQuery(undefined, {
    skip: isUserDeleted || !currentUser, // ⛔️ Évite la requête si l'utilisateur est déconnecté
  });
  const [deleteUser] = useDeleteAccountMutation();

  useEffect(() => {
    // Mettre à jour Redux quand l'API répond
    if (profileData && !isUserDeleted) {
      dispatch(setUser(profileData));
    }
  }, [profileData, dispatch, isUserDeleted]);

  /** ===================== 🟢 GESTION DU CHARGEMENT ===================== */
  useEffect(() => {
    if (isLoadingProfile) {
      Swal.fire({
        title: 'Chargement...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close();
    }
  }, [isLoadingProfile]);

  /** ===================== ❌ GESTION DES ERREURS ===================== */
  useEffect(() => {
    if (isErrorProfile) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Impossible de charger votre profil.',
      });
    }
  }, [isErrorProfile]);

  // Gestion de la redirection vers la page de modification
  const handleEditProfile = () => navigate('/my-account/settings');

  // Gestion de la suppression de l'utilisateur
  const handleDeleteUser = () => {
    if (!currentUser) return;

    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler',
    }).then(async (result) => {
      // Afficher un message de succès
      if (result.isConfirmed) {
        try {
          await deleteUser(currentUser.id).unwrap();

          // Supprimer le token et déconnecter l'utilisateur
          dispatch(clearAuth());

          setIsUserDeleted(true);

          // Afficher un message de succès
          Swal.fire({
            title: 'Supprimé!',
            text: 'Votre compte a été supprimé.',
            icon: 'success',
          });

          // Rediriger vers la page d'accueil après un court délai
          setTimeout(() => {
            navigate('/');
          }, 1500);
        } catch (error) {
          console.error('Erreur lors de la suppression du compte:', error);
        }
      }
    });
  };

  return (
    <main className="min-h-screen p-4">
      {/* 🔹 Bouton de retour à la page précédente */}
      <Button type="button" variant="default" onClick={() => navigate(-1)}>
        <FaLongArrowAltLeft />
      </Button>
      <h1 className="text-center h2-title my-10">Details de mon profil</h1>
      <section className="text-lg flex flex-col justify-between gap-4 p-6 bg-white shadow-md border-2 border-greenRegular rounded-lg md:flex-row lg:max-w-[900px] lg:mx-auto">
        <ul className="md:w-1/2 space-y-4" aria-labelledby="profile-details">
          <li>
            <span className="font-bold text-greenRegular">Nom :</span>{' '}
            {currentUser?.last_name}
          </li>
          <li>
            <span className="font-bold text-greenRegular">Prénom :</span>{' '}
            {currentUser?.first_name}
          </li>
          <li>
            <span className="font-bold text-greenRegular">Email :</span>{' '}
            {currentUser?.email}
          </li>
          <li>
            <span className="font-bold text-greenRegular">Téléphone :</span>{' '}
            {currentUser?.phone_number}
          </li>
        </ul>

        <ul className="md:w-1/2 space-y-4" aria-labelledby="profile-details">
          <li>
            <span className="font-bold text-greenRegular">Adresse :</span>{' '}
            {currentUser?.address}
          </li>
          <li>
            <span className="font-bold text-greenRegular">Code postal :</span>{' '}
            {currentUser?.zip_code}
          </li>
          <li>
            <span className="font-bold text-greenRegular">Ville :</span>{' '}
            {currentUser?.city}
          </li>
          <li>
            <span className="font-bold text-greenRegular">Pays :</span>{' '}
            {currentUser?.country}
          </li>
        </ul>
      </section>
      <div className="flex flex-col items-center mt-4 md:flex-row md:justify-center md:gap-4">
        <Button variant="form" type="button" onClick={handleEditProfile}>
          Modifier
        </Button>
        <Button variant="form-danger" type="button" onClick={handleDeleteUser}>
          Supprimer mon profil
        </Button>
      </div>
    </main>
  );
}

export default ProfilDetailsPage;
