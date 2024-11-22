import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import api from '../../api';

function ProfilDetails() {
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
    navigate('/modifier-mon-profil');
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col gap-8 m-10">
      <h1 className="text-center h3-title">Details de mon profil</h1>
      <div className="mr-16 ml-16 flex flex-row  justify-evenly border-2 border-solid border-greenRegular w ">
        <div className="p-6 text-left">
          <p className="">Nom : {user.last_name}</p>
          <p className="">Prénom : {user.first_name}</p>
          <p className="">Email : {user.email}</p>
          <p className="">Téléphone : {user.phone_number}</p>
        </div>

        <div className="p-6 text-left">
          <p className="">Adresse : {user.address}</p>
          <p className="">Code postal : {user.zip_code}</p>
          <p className="">Ville : {user.city}</p>
          <p className="uppercase">Pays : {user.country}</p>
        </div>
      </div>

      <button className="btn m-auto" type="button" onClick={handleEditClick}>
        Modifier
      </button>
    </div>
  );
}

export default ProfilDetails;
