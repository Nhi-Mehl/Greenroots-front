import { useLocation } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Banner from './Banner/Banner';

function Header() {
  const { pathname } = useLocation(); // Récupération de la route actuelle

  // Routes sur lesquelles le composant Banner doit être affiché
  const routesWithBanner = ['/', '/projects', '/project'];

  // Vérifie si la route actuelle nécessite d'afficher le Banner
  const showBanner = routesWithBanner.includes(pathname);

  return (
    <header className="relative">
      <NavBar />
      {/* Affiche le Banner seulement si la route est dans routesWithBanner */}
      {showBanner && <Banner />}
    </header>
  );
}

export default Header;
