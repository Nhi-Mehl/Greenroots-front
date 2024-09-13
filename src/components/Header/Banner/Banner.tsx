import { useNavigate, useLocation } from 'react-router-dom';

function Banner() {
  const navigate = useNavigate();
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

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <img
        className="w-full lg:max-h-[800px] object-cover object-top"
        src={getImageForRoute()}
        alt="banner"
      />
      <div className="absolute inset-0 flex flex-col gap-10 items-center justify-center text-white">
        <h1 className="h1-title text-center mt-8">
          Plantez aujourd’hui,
          <span className="block"> protégez demain</span>
        </h1>
        <p className="text-2xl text-center mt-6">
          Rejoignez notre communauté pour un avenir durable où chaque arbre
          planté{' '}
          <span className="block">
            fait germer l'espoir d'une planète plus verte
          </span>
        </p>
        <button className="btn mt-6" type="button" onClick={handleRegister}>
          S’inscrire
        </button>
      </div>
    </div>
  );
}

export default Banner;
