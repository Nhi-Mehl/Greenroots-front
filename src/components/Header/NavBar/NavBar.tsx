import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  faCartShopping,
  faUser,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import { selectCart } from '../../../store/features/cart/cartSlice';

interface ShowBannerProps {
  showBanner: boolean;
}

function NavBar({ showBanner }: ShowBannerProps) {
  // Récupérer les articles du panier de la store Redux
  const cartItems = useAppSelector(selectCart);

  // Récupérer le statut d'authentification de la store Redux
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Si showBanner est vrai, on enlève la classe 'bg-green-900'
  const navClassName = `
    w-full z-20 flex items-center justify-between p-4 sm:p-6 lg:p-8 text-white
    ${showBanner ? 'absolute top-0 left-0' : 'bg-greenDark relative'}
  `;

  return (
    <nav className={navClassName.trim()}>
      <Link to="/">
        <img
          src="/images/logo-blanc-png.png"
          alt="Logo GreenRoots"
          className="h-12 sm:h-14 md:h-16 lg:h-20"
        />
      </Link>
      <div className="text-shadow font-semibold hidden space-x-16 text-xl md:flex md:text-xl lg:text-2xl">
        <Link to="/projects">Nos projets</Link>
        <Link to="/about-us">Qui sommes nous</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="flex gap-4 md:gap-2">
        <Link to={isAuthenticated ? '/my-account' : '/login'} className="p-4">
          <FontAwesomeIcon className="text-xl lg:text-2xl" icon={faUser} />
        </Link>
        <Link to="/cart" className="hidden p-4 md:inline">
          <FontAwesomeIcon
            className="text-xl sm:text-2xl"
            icon={faCartShopping}
          />
          {cartItemCount > 0 && (
            <span className="absolute right-7 top-7 rounded-full bg-red-600 px-2 py-1 text-xs text-white lg:mr-10">
              {cartItemCount}
            </span>
          )}
        </Link>
        <button
          type="button"
          className="text-white md:hidden"
          onClick={handleMenuClick}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon className="text-xl sm:text-2xl" icon={faBars} />
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed z-50 inset-0 flex flex-col items-center space-y-10 bg-green-900 bg-opacity-100 py-20 md:hidden">
          <Link to="/" className="text-lg text-white" onClick={handleLinkClick}>
            Accueil
          </Link>
          <Link
            to="/projects"
            className="text-lg text-white"
            onClick={handleLinkClick}
          >
            Nos projets
          </Link>
          <Link
            to="/about-us"
            className="text-lg text-white "
            onClick={handleLinkClick}
          >
            Qui sommes nous
          </Link>
          <Link
            to="/contact"
            className="text-lg text-white"
            onClick={handleLinkClick}
          >
            Contact
          </Link>
          <Link
            to="/register"
            className="text-lg text-white"
            onClick={handleLinkClick}
          >
            S&apos;incrire
          </Link>
          <Link
            to="/login"
            className="text-lg text-white"
            onClick={handleLinkClick}
          >
            Se connecter
          </Link>
          <Link
            to="/cart"
            className="text-lg text-white"
            onClick={handleLinkClick}
          >
            Panier
          </Link>
          <button
            type="button"
            className="absolute right-10 top-0 text-white"
            onClick={handleMenuClick}
            aria-label="Close menu"
          >
            <FontAwesomeIcon className="text-xl" icon={faBars} />
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
