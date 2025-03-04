import { useLocation } from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import Banner from './Banner/Banner';
import createSlug from '../../utils/slug';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';

function Header() {
  // Récupération du projet actuel de la store Redux
  const { project } = useAppSelector((state: RootState) => state.project);
  // const { project } = useProject();
  const { pathname } = useLocation(); // Récupération de la route actuelle

  let slug = '';
  if (project) {
    slug = createSlug(project.name);
  }
  // Routes sur lesquelles le composant Banner doit être affiché
  const routesWithBanner = [
    '/',
    '/projects',
    project ? `/projects/${project.id}/${slug}` : '', // Vérifie si project existe
  ];

  // Vérifie si la route actuelle nécessite d'afficher le Banner
  const showBanner = routesWithBanner.includes(pathname);

  return (
    <header className="relative">
      <NavBar showBanner={showBanner} />
      {/* Affiche le Banner seulement si la route est dans routesWithBanner */}
      {showBanner && <Banner />}
    </header>
  );
}

export default Header;
