import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useAppDispatch } from '../../../store/hooks';
import { setUser } from '../../../store/features/auth/authSlice';
import { UpdateProfileRequest } from '../../../@types/IUser';
import {
  useUpdateProfileMutation,
  useGetProfileQuery,
} from '../../../store/features/user/userApiSlice';

function EditProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Récupérer le profil actuel via RTK Query
  const { data: user, refetch } = useGetProfileQuery();
  const [
    updateProfile,
    {
      isLoading: isLoadingUpdate,
      isError: isErrorUpdate,
      error: updateError,
      isSuccess: isSuccessUpdate,
    },
  ] = useUpdateProfileMutation();

  // État local du formulaire
  const [formData, setFormData] = useState<UpdateProfileRequest>(
    user as UpdateProfileRequest
  );

  // Charger les données de l'utilisateur dans le formulaire
  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  /** ===================== ✅ GESTION DU SUCCÈS ===================== */
  useEffect(() => {
    if (isSuccessUpdate) {
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
        title: 'Vos informations ont été mises à jour avec succès.',
      });

      // 🔹 Rediriger l'utilisateur vers la page de détails de profil
      setTimeout(() => {
        navigate('/userdetails');
      }, 1000);
    }
  }, [isSuccessUpdate, navigate]);

  /** ===================== 🟢 GESTION DU CHARGEMENT ===================== */
  useEffect(() => {
    if (isLoadingUpdate) {
      // Afficher une alerte de chargement
      Swal.fire({
        title: 'Chargement des données...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close(); // Fermer le chargement dès qu'il y a une réponse
    }
  }, [isLoadingUpdate]);

  /** ===================== ❌ GESTION DES ERREURS ===================== */
  useEffect(() => {
    if (isErrorUpdate || !formData) {
      let errorMessage =
        'Une erreur est survenue lors du chargement des données.';
      if (
        updateError &&
        typeof updateError === 'object' &&
        'data' in updateError
      ) {
        errorMessage = (updateError as { data: string }).data;
      }

      // Afficher une alerte d'erreur
      Swal.fire({
        icon: 'error',
        title: 'Erreur lors du chargement des données.',
        text: errorMessage,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Réessayer',
      });
    }
  }, [isErrorUpdate, updateError, formData]);

  /** ===================== 🟢 GESTION DES CHANGEMENTS DANS LES CHAMPS DU FORMULAIRE ===================== */
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData!,
      [name]: value,
    }));
  };

  /** ===================== ✍️ GESTION DE LA SOUMISSION DU FORMULAIRE ===================== */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) return;

    try {
      // 🔹 Exécuter la mutation pour mettre à jour le profil
      const userUpdated = await updateProfile(formData).unwrap();

      // 🔹 Mettre à jour Redux avec les nouvelles infos utilisateur
      dispatch(setUser(userUpdated.data));

      // 🔹 Recharger les données de l'utilisateur
      await refetch();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil', error);
    }
  };

  return (
    <main className="px-4 py-10 min-h-screen sm:px-8 md:pt-24 sm:py-12">
      <h1 className="h2-title text-3xl text-greenRegular text-center mb-6 lg:text-5xl">
        Modifier mon profil
      </h1>

      <form
        className="p-6 bg-white shadow-md border-2 border-greenRegular rounded-lg lg:max-w-[600px] lg:mx-auto"
        action="/register"
        onSubmit={handleSubmit}
      >
        <div className="md:grid md:grid-cols-2 md:gap-x-6">
          <label htmlFor="first_name">
            Prénom
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Votre prénom"
              value={formData?.first_name}
              onChange={handleChange}
              className="input"
            />
          </label>

          <label>
            Nom
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Votre nom"
              value={formData?.last_name}
              onChange={handleChange}
              className="input"
            />
          </label>

          <label className="mb-2" htmlFor="address">
            Adresse
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Votre adresse"
              value={formData?.address}
              onChange={handleChange}
              className="input"
            />
          </label>

          <label className="mb-2" htmlFor="zip_code">
            Code postal
            <input
              type="text"
              id="zip_code"
              name="zip_code"
              placeholder="Votre code postal"
              value={formData?.zip_code}
              onChange={handleChange}
              className="input"
            />
          </label>

          <label htmlFor="city">
            Ville
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Votre ville"
              value={formData?.city}
              onChange={handleChange}
              className="input"
            />
          </label>

          <label htmlFor="country">
            Pays
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Votre pays"
              value={formData?.country}
              onChange={handleChange}
              className="input"
            />
          </label>

          <label htmlFor="phone_number">
            Téléphone
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              placeholder="Votre téléphone"
              value={formData?.phone_number}
              onChange={handleChange}
              className="input"
            />
          </label>

          <label className="mb-2" htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Votre email"
              value={formData?.email}
              onChange={handleChange}
              className="input"
            />
          </label>
        </div>

        <button type="submit" className="btn-form" disabled={isLoadingUpdate}>
          {isLoadingUpdate ? 'Mise à jour...' : 'Valider'}
        </button>
      </form>
    </main>
  );
}

export default EditProfilePage;
