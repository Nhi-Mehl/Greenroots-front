import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { IUser } from '../../../@types';
import api from '../../../api';

function EditProfilePage() {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState<IUser>(user as IUser);
  const navigate = useNavigate();

  // Chargement du formulaire lié à l'utilisateur connecté
  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Gestion des changements dans les champs du formulaire
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData!,
      [name]: value,
    }));
  };

  // Modification des données de l'utilisateur
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData) {
      console.error('Les données du formulaire sont nulles');
      return;
    }
    console.log(formData);

    const token = localStorage.getItem('token');
    try {
      const response = await api.put(
        `http://localhost:3000/api/users/${user?.id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response.data);

      navigate('/userdetails');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil', error);
    }
    console.log(formData);
  };

  // Gestion de la suppression de l'utilisateur
  const handleDelete = async () => {
    if (!user) {
      console.error('Utilisateur non trouvé');
      return;
    }

    if (
      window.confirm(
        'Êtes-vous sûr de vouloir quitter définitivement GreenRoots?'
      )
    )
      try {
        await api.delete(`/users/${user?.id}`);
        setUser(null);
        navigate('/');
      } catch (error) {
        console.error('Erreur lors de la suppression du profil');
      }
  };

  if (!formData) {
    return <p>Chargement des données...</p>;
  }

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
              value={formData.first_name}
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
              value={formData.last_name}
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
              value={formData.address}
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
              value={formData.zip_code}
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
              value={formData.city}
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
              value={formData.country}
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
              value={formData.phone_number}
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
              value={formData.email}
              onChange={handleChange}
              className="input"
            />
          </label>
        </div>
        <div className="flex flex-row mt-8 gap-12">
          <button type="submit" className="btn-form">
            Valider
          </button>
          <button type="button" onClick={handleDelete} className="btn-form">
            Supprimer mon profil
          </button>
        </div>
      </form>
    </main>
  );
}

export default EditProfilePage;
