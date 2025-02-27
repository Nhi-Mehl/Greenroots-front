import { useNavigate, useLocation } from 'react-router-dom';

import BannerContent from './BannerContent';
import createSlug from '../../../utils/slug';
import { useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store/store';

function Banner() {
  const navigate = useNavigate();
  // Récupération du projet actuel de la store Redux
  const { project } = useAppSelector((state: RootState) => state.project);
  const { pathname } = useLocation();

  let slug = '';
  if (project && project.name) {
    slug = createSlug(project.name);
  }

  // Tableau des routes avec leurs valeurs associées
  const routesWithContent: {
    [key: string]: { image: string; content: JSX.Element } | null;
  } = {
    '/': {
      image: '/images/banner/header-photo.webp',
      content: (
        <BannerContent
          title="Plantez aujourd’hui,"
          subtitle=" protégez demain"
          description={
            <>
              Rejoignez notre communauté pour un avenir durable où chaque arbre
              planté fait germer l&apos;espoir d&apos;une planète plus verte.
            </>
          }
          buttonText="S’inscrire"
          onButtonClick={() => navigate('/register')}
        />
      ),
    },
    '/projects': {
      image: '/images/banner/bg-projects-page.jpg',
      content: <BannerContent title="Nos Projets" />,
    },
  };

  // Gestion dynamique de la route pour /projects/:id/:slug
  if (project && pathname === `/projects/${project.id}/${slug}`) {
    // Ajouter la route dynamique dans routesWithContent
    routesWithContent[`/projects/${project.id}/${slug}`] = {
      image: `/images/projets/${project.picture}.jpg`, // Utiliser l'image du projet
      content: <BannerContent title={project.name} />, // Utiliser le nom du projet
    };
  }

  // Récupérer les données de la route actuelle
  const routeData = routesWithContent[pathname];

  return (
    <div className="relative">
      {routeData && (
        <>
          {/* Afficher l'image */}
          <img
            className="w-full h-[300px] sm:h-fit lg:max-h-[800px] object-cover object-top filter brightness-75"
            src={routeData.image}
            alt="banner"
          />

          {/* Afficher le contenu */}
          <div className="absolute inset-0 flex items-center justify-center">
            {routeData.content}
          </div>
        </>
      )}
    </div>
  );
}

export default Banner;
