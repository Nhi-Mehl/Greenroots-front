import { useNavigate, Link } from 'react-router-dom';

import {
  selectCurrentUser,
  clearAuth,
} from '../../../store/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useLogoutMutation } from '../../../store/features/auth/authApiSlice';
import Button from '../../Form/Button/Button';

function MyAccountPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [logout] = useLogoutMutation();
  const classLink =
    'font-montserrat text-white font-semibold text-xs md:text-sm lg:text-base py-2 px-3 md:py-3 md:px-4 lg:py-3 lg:px-5 bg-greenRegular w-fit rounded-lg lg:rounded-xl';

  const handleLogout = async () => {
    try {
      // On envoie une requête POST à l'API pour déconnecter l'utilisateur et invalider le token blacklisted
      // unwrap attend la requêtte termine avant aller dans action logout
      await logout().unwrap();
      // On met à jour le state Redux pour déconnecter l'utilisateur
      dispatch(clearAuth());
      // On redirige l'utilisateur vers la page de connexion
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <main className="flex flex-col justify-center min-h-screen">
      <h2 className="h2-title text-center mt-10">
        Mon Compte {user?.first_name}
      </h2>
      <h3 className="text-center text-2xl">Bonjour</h3>
      <div className="flex flex-col items-center gap-4 my-10 md:my-20 md:justify-center md:gap-10 md:flex-row">
        <Link to="/userdetails" className={classLink}>
          Mon profil
        </Link>

        <Link to="/my-account/purchases" className={classLink}>
          Mes commandes
        </Link>
        <Button type="button" variant="default" onClick={handleLogout}>
          Déconnexion
        </Button>
      </div>
    </main>
  );
}

export default MyAccountPage;
