import { useContext, useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { IUser } from '../../@types';
import api from '../../api';
import axios from 'axios';

function EditProfil() {
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
      const response = await axios.put(
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
  const handleDelete = async (e) => {
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
    <div className="flex flex-col gap-8 m-10">
      <h1 className="text-center h3-title">Modifier mon profil</h1>
      <div className="flex justify-center">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-8 w-full p-14 border-2 border-solid border-green-950 bg-emerald-50"
          action="/register"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="first_name">
              Prénom
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Votre prénom"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="last_name">
              Nom
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Votre nom"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="address">
              Adresse
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Votre adresse"
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="zip_code">
              Code postal
            </label>
            <input
              type="text"
              id="zip_code"
              name="zip_code"
              placeholder="Votre code postal"
              value={formData.zip_code}
              onChange={handleChange}
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="city">
              Ville
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Votre ville"
              value={formData.city}
              onChange={handleChange}
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="country">
              Pays
            </label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Votre pays"
              value={formData.country}
              onChange={handleChange}
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="phone_number">
              Téléphone
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              placeholder="Votre téléphone"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Votre email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="flex flex-row mt-8 gap-12">
            <button
              type="submit"
              className="w-full rounded-md border-0 p-1.5  text-gray-100 ring-1 ring-inset bg-green-900"
            >
              Valider
            </button>
            
            <button
              type="button"
              onClick={handleDelete}
              className="w-full rounded-md border-0 p-1.5  text-gray-100 ring-1 ring-inset bg-red-700"
            >
              Supprimer mon profil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfil;
