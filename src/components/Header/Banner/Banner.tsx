import { useLocation } from 'react-router-dom';

function Banner() {
  const location = useLocation();
  const getImageForRoute = () => {
    switch (location.pathname) {
      case '/':
        return '/images/banner/header-photo.webp';
      case '/projects':
        return '/images/banner/bg-projects-page.jpg';
      // Par défaut, tu peux définir une image pour les routes non spécifiées
      default:
        return '/images/banner/default-banner.webp';
    }
  };
  return (
    <div>
      <figure>
        <img className="w-full h-128" src={getImageForRoute()} alt="banner" />
      </figure>
    </div>
  );
}

export default Banner;
