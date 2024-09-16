import { useLocation } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Banner from './Banner/Banner';
import { useProject } from '../../context/ProjectContext';

const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}; // Renommé en IProjec

function Header() {
  const { project } = useProject();
  const { pathname } = useLocation(); // Récupération de la route actuelle

  let slug = '';
  if (project && project.name) {
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
      <NavBar />
      {/* Affiche le Banner seulement si la route est dans routesWithBanner */}
      {showBanner && <Banner />}
    </header>
  );
}

export default Header;
