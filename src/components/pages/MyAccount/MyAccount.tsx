import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../../features/auth/authSlice';
import { useAppSelector } from '../../../store/hooks';

function MyAccountPage() {
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);

  // const handleLogout = async () => {
  //   await api.post('/auth/logout'); // On envoie une requête POST à l'API pour déconnecter l'utilisateur et invalider le token
  //   localStorage.removeItem('token'); // On supprime le token du stockage local
  //   setUser(null); // On réinitialise l'utilisateur dans le contexte
  //   navigate('/login'); // On redirige l'utilisateur vers la page de connexion
  // };

  return (
    <main className="flex flex-col justify-center min-h-screen">
      <h2 className="h2-title text-center">Mon Compte {user?.first_name}</h2>
      <h3 className="text-center text-2xl">Bonjour</h3>
      <div className="flex flex-col items-center gap-4 my-10 md:my-20 md:justify-center md:gap-10 md:flex-row">
        <button
          className="btn w-full"
          type="button"
          onClick={() => {
            navigate('/userdetails');
          }}
        >
          Mon profil
        </button>
        <button
          className="btn w-full"
          type="button"
          onClick={() => {
            navigate(`/orders`);
          }}
        >
          Mes commandes
        </button>
        <button className="btn w-full" type="button">
          Déconnexion
        </button>
      </div>
    </main>
  );
}

export default MyAccountPage;
