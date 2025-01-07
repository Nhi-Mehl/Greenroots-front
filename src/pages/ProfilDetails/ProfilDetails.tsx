import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import api from '../../api';

function ProfilDetailsPage() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  // Chargement du formulaire lié à l'utilisateur connecté
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await api.get(`/users/${user?.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('ca marche pas', error);
      }
    };

    // si `user` est indéfini ou `user.id` n'est pas disponible
    if (!user || !user.id) {
      fetchUserData();
    }
  }, [user, setUser]);

  const handleEditClick = () => {
    navigate('/my-account/settings');
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="px-4 py-10 min-h-screen sm:px-8 md:pt-24 sm:py-12">
      <h1 className="text-center h2-title mb-8">Details de mon profil</h1>
      <section className="text-lg flex flex-col justify-between gap-4 p-6 bg-white shadow-md border-2 border-greenRegular rounded-lg md:flex-row lg:max-w-[900px] lg:mx-auto">
        <div className="md:w-1/2 space-y-4">
          <p>
            <span className="font-bold text-greenRegular">Nom :</span>{' '}
            {user.last_name}
          </p>
          <p>
            <span className="font-bold text-greenRegular">Prénom :</span>{' '}
            {user.first_name}
          </p>
          <p>
            <span className="font-bold text-greenRegular">Email :</span>{' '}
            {user.email}
          </p>
          <p>
            <span className="font-bold text-greenRegular">Téléphone :</span>{' '}
            {user.phone_number}
          </p>
        </div>

        <div className="md:w-1/2 space-y-4">
          <p>
            <span className="font-bold text-greenRegular">Adresse :</span>{' '}
            {user.address}
          </p>
          <p>
            <span className="font-bold text-greenRegular">Code postal :</span>{' '}
            {user.zip_code}
          </p>
          <p>
            <span className="font-bold text-greenRegular">Ville :</span>{' '}
            {user.city}
          </p>
          <p>
            <span className="font-bold text-greenRegular">Pays :</span>{' '}
            {user.country}
          </p>
        </div>
      </section>

      <button
        className="btn block mx-auto mt-8"
        type="button"
        onClick={handleEditClick}
      >
        Modifier
      </button>
    </main>
  );
}

export default ProfilDetailsPage;
