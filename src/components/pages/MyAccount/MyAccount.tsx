import { useNavigate } from 'react-router-dom';
import {
  selectCurrentUser,
  logoutAction,
} from '../../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useLogoutMutation } from '../../../api/authApiSlice';

function MyAccountPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout(); // On envoie une requête POST à l'API pour déconnecter l'utilisateur et invalider le token
    dispatch(logoutAction()); // On met à jour le state Redux pour déconnecter l'utilisateur
    navigate('/login'); // On redirige l'utilisateur vers la page de connexion
  };

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
        <button className="btn w-full" type="button" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </main>
  );
}

export default MyAccountPage;
