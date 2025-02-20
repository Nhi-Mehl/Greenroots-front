import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';
import { BiShoppingBag } from 'react-icons/bi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

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
  // Récupérer l'utilisateur connecté de la store Redux
  const user = useAppSelector(selectCurrentUser);
  // Appel de la mutation logout
  const [logout] = useLogoutMutation();
  const classLink =
    'flex flex-col items-center gap-4 w-full bg-white shadow-md p-6 mb-4 rounded-lg';

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fonction pour déconnecter l'utilisateur
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
    <main className="flex flex-col mt-10 min-h-screen">
      <h1 className="h1-title text-center mt-10">
        Bonjour, {user?.first_name} !
      </h1>
      <div className="flex flex-col items-center gap-4 m-auto w-11/12 my-10 md:my-20 md:gap-10">
        {/* <Link to="/userdetails" className={classLink}> */}
        <div className={classLink}>
          <div className="w-full text-lg lg:text-2xl font-semibold flex items-center gap-4">
            <IoSettingsOutline className="flex-0" />
            <p className="flex-1">Paramètres du compte</p>

            {isMenuOpen ? (
              <button
                type="button"
                className="shrink-0"
                onClick={() => setIsMenuOpen(false)}
              >
                <IoIosArrowUp />
              </button>
            ) : (
              <button type="button" onClick={() => setIsMenuOpen(true)}>
                <IoIosArrowDown />
              </button>
            )}
          </div>
          {isMenuOpen && (
            <ul className="self-stretch border-t-2 pt-4 space-y-2 sm:space-y-4 text-base sm:text-lg underline text-gray-600">
              <Link to="/userdetails">
                <li>Mes informations</li>
              </Link>
              <Link to="/my-account/settings">
                <li>Modifier mon profile</li>
              </Link>
              {/* <li>Modifier le mot de passe</li>
    <li>Supprimer mon compte</li> */}
            </ul>
          )}
        </div>
        {/* </Link> */}

        <Link to="/my-account/purchases" className={classLink}>
          <div className="w-full text-lg lg:text-2xl font-semibold flex items-center gap-4">
            <BiShoppingBag className="flex-0" />

            <p className="flex-1">Mes commandes</p>
          </div>
        </Link>
        <Button
          type="button"
          variant="form-danger"
          className="max-w-[400px]"
          onClick={handleLogout}
        >
          Déconnexion
        </Button>
      </div>
    </main>
  );
}

export default MyAccountPage;
