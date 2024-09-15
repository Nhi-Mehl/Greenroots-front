import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useProject } from '../../../context/ProjectContext';
import BannerContent from './BannerContent';

function Banner() {
  const navigate = useNavigate();
  const { project } = useProject();
  const { pathname } = useLocation();
  const { id, slug } = useParams<{ id: string; slug: string }>();
  console.log('ID:', id);
  console.log('Slug:', slug);

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
              planté fait germer l'espoir d'une planète plus verte.
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
  // if (id && slug && project && pathname === `/projects/${id}/${slug}`) {
  //   // Ajouter la route dynamique dans routesWithContent
  //   routesWithContent[`/projects/${id}/${slug}`] = {
  //     image: `/images/projets/${project.picture}.jpg`, // Utiliser l'image du projet
  //     content: <BannerContent title={project.name} />, // Utiliser le nom du projet
  //   };
  // }

  // Récupérer les données de la route actuelle
  const routeData = routesWithContent[pathname];

  // Debugging pour vérifier ce qui est renvoyé
  console.log('Current pathname:', pathname);
  console.log('Route data:', routeData);
  console.log('Project:', project);

  return (
    <div className="relative">
      {routeData && (
        <>
          {/* Afficher l'image */}
          <img
            className="w-full max-h-96 lg:max-h-[800px] object-cover object-top"
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
