import { useNavigate, useLocation } from 'react-router-dom';
import BannerContent from './BannerContent';

function Banner() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
    '/project': {
      image: '/images/banner/bg-projects-page.jpg',
      content: <BannerContent title="Nos Projets" />,
    },
  };

  // Récupérer l'image en fonction de la route actuelle
  const routeData = routesWithContent[pathname];

  // Debugging pour vérifier ce qui est renvoyé
  console.log('Current pathname:', pathname);
  console.log('Route data:', routeData);

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
