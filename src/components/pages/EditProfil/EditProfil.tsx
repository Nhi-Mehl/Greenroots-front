import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IoArrowBackOutline } from 'react-icons/io5';

import { useAppDispatch } from '../../../store/hooks';
import { setUser } from '../../../store/features/auth/authSlice';
import { UpdateProfileRequest } from '../../../@types/User';
import {
  useUpdateProfileMutation,
  useGetProfileQuery,
} from '../../../store/features/user/userApiSlice';
import Form from '../../Form/Form';
import Input from '../../Form/Input/Input';
import Button from '../../Form/Button/Button';

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
    }
  }, [isSuccessUpdate, navigate]);

  /** ===================== ❌ GESTION DES ERREURS ===================== */
  useEffect(() => {
    if (isErrorUpdate) {
      const errorMessage =
        updateError && typeof updateError === 'object' && 'data' in updateError
          ? (updateError as { data: string }).data
          : 'Une erreur est survenue lors de la mise à jour.';

      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: errorMessage,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Réessayer',
      });
    }
  }, [isErrorUpdate, updateError]);

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

      // 🔹 Rediriger l'utilisateur vers la page de détails de profil
      setTimeout(() => {
        navigate('/userdetails');
      }, 1000);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Erreur lors de la mise à jour du profil',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Réessayer',
      });
    }
  };

  return (
    <main className="max-w-7xl mx-auto min-h-screen p-4">
      {/* 🔹 Link retour à la page mon compte */}
      <Link
        to="/my-account"
        className="flex gap-2 mb-10 items-center hover:underline"
      >
        <IoArrowBackOutline className="text-2xl" />
        <p className="text-lg hidden lg:block">Retour à mon compte</p>
      </Link>

      <h1 className="h1-title text-greenRegular text-center my-10">
        {' '}
        Modifier mon profil
      </h1>
      {/* Formulaire */}
      <Form
        action="/register"
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-md border-2 border-greenRegular rounded-lg lg:max-w-[600px] lg:mx-auto"
      >
        <div className="md:grid md:grid-cols-2 md:gap-x-6">
          <Input
            htmlFor="first_name"
            label="Prénom"
            type="text"
            name="first_name"
            id="first_name"
            placeholder="Votre prénom"
            value={formData?.first_name}
            onChange={handleChange}
          />

          <Input
            htmlFor="last_name"
            label="Nom"
            type="text"
            name="last_name"
            id="last_name"
            placeholder="Votre nom"
            value={formData?.last_name}
            onChange={handleChange}
          />

          <Input
            htmlFor="address"
            label="Adresse"
            type="text"
            name="address"
            id="address"
            placeholder="Votre adresse"
            value={formData?.address}
            onChange={handleChange}
          />

          <Input
            htmlFor="zip_code"
            label="Code postal"
            type="text"
            name="zip_code"
            id="zip_code"
            placeholder="Votre code postal"
            value={formData?.zip_code}
            onChange={handleChange}
          />

          <Input
            htmlFor="city"
            label="Ville"
            type="text"
            name="city"
            id="city"
            placeholder="Votre ville"
            value={formData?.city}
            onChange={handleChange}
          />

          <Input
            htmlFor="country"
            label="Pays"
            type="text"
            name="country"
            id="country"
            placeholder="Votre pays"
            value={formData?.country}
            onChange={handleChange}
          />

          <Input
            htmlFor="phone_number"
            label="Téléphone"
            type="text"
            name="phone_number"
            id="phone_number"
            placeholder="Votre téléphone"
            value={formData?.phone_number}
            onChange={handleChange}
          />

          <Input
            htmlFor="email"
            label="Email"
            type="email"
            name="email"
            id="email"
            placeholder="Votre email"
            value={formData?.email}
            onChange={handleChange}
          />
        </div>

        <Button
          type="submit"
          variant="form"
          className="block m-auto"
          disabled={isLoadingUpdate}
        >
          {isLoadingUpdate ? 'Mise à jour...' : 'Valider'}
        </Button>
      </Form>
    </main>
  );
}

export default EditProfilePage;
