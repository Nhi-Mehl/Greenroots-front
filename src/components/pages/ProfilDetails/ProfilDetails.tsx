import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  selectCurrentUser,
  setUser,
} from '../../../store/features/auth/authSlice';
import {
  useDeleteAccountMutation,
  useGetProfileQuery,
} from '../../../store/features/user/userApiSlice';

function ProfilDetailsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Récupérer l'utilisateur connecté de la store Redux
  const user = useAppSelector(selectCurrentUser);
  // Récupérer les informations utilisateur via RTK Query
  const {
    data,
    isLoading: isLoadingProfile,
    isError: isErrorProfile,
  } = useGetProfileQuery();
  const [deleteUser] = useDeleteAccountMutation();

  useEffect(() => {
    // Mettre à jour Redux quand l'API répond
    if (data && data.id !== user?.id) {
      dispatch(setUser(data));
    }
  });

  // Gestion du chargement et des erreurs
  if (isLoadingProfile) return <p>Chargement...</p>;
  if (isErrorProfile) return <p>Une erreur est survenue</p>;

  // Gestion de la redirection vers la page de modification
  const handleEditClick = () => {
    navigate('/my-account/settings');
  };

  // Gestion de la suppression de l'utilisateur
  const handleDeleteUser = () => {
    if (!user) return;

    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      // Afficher un message de succès
      if (result.isConfirmed) {
        deleteUser(user.id);
        // Supprimer l'utilisateur du store Redux
        dispatch(setUser(null));
        console.log('🚀 Utilisateur supprimé:', user);

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
      }
    });
  };

  return (
    <main className="px-4 py-10 min-h-screen sm:px-8 md:pt-24 sm:py-12">
      <h1 className="text-center h2-title mb-8">Details de mon profil</h1>
      <section className="text-lg flex flex-col justify-between gap-4 p-6 bg-white shadow-md border-2 border-greenRegular rounded-lg md:flex-row lg:max-w-[900px] lg:mx-auto">
        <div className="md:w-1/2 space-y-4">
          <p>
            <span className="font-bold text-greenRegular">Nom :</span>{' '}
            {user?.last_name}
          </p>
          <p>
            <span className="font-bold text-greenRegular">Prénom :</span>{' '}
            {user?.first_name}
          </p>
          <p>
            <span className="font-bold text-greenRegular">Email :</span>{' '}
            {user?.email}
          </p>
          <p>
            <span className="font-bold text-greenRegular">Téléphone :</span>{' '}
            {user?.phone_number}
          </p>
        </div>

        <div className="md:w-1/2 space-y-4">
          <p>
            <span className="font-bold text-greenRegular">Adresse :</span>{' '}
            {user?.address}
          </p>
          <p>
            <span className="font-bold text-greenRegular">Code postal :</span>{' '}
            {user?.zip_code}
          </p>
          <p>
            <span className="font-bold text-greenRegular">Ville :</span>{' '}
            {user?.city}
          </p>
          <p>
            <span className="font-bold text-greenRegular">Pays :</span>{' '}
            {user?.country}
          </p>
        </div>
      </section>
      <div className="lg:max-w-[900px] lg:mx-auto flex flex-row mt-8 gap-12">
        <button className="btn-form" type="button" onClick={handleEditClick}>
          Modifier
        </button>
        <button type="button" className="btn-form" onClick={handleDeleteUser}>
          Supprimer mon profil
        </button>
      </div>
    </main>
  );
}

export default ProfilDetailsPage;
