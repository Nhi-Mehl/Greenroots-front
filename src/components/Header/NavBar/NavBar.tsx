import {
  faCartShopping,
  faUser,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../../Cart/CartContext/CartContext';
import { useUser } from '../../../context/UserContext';

interface ShowBannerProps {
  showBanner: boolean;
}

function NavBar({ showBanner }: ShowBannerProps) {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext);

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const handleMenuClick = () => {
    console.log('Menu button clicked');
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Si showBanner est vrai, on enlève la classe 'bg-green-900'
  const navClassName = `
    w-full z-20 flex items-center justify-between p-8 text-white
    ${showBanner ? 'absolute top-0 left-0' : 'bg-greenDark relative'}
  `;

  return (
    <nav className={navClassName.trim()}>
      <Link to="/">
        <img
          src="/images/logo-blanc-png.png"
          alt="Logo GreenRoots"
          className="h-12 md:h-16 lg:h-20"
        />
      </Link>
      <div className="text-shadow font-semibold hidden space-x-20 text-xl md:flex md:text-xl lg:text-2xl">
        <Link to="/projects">Nos projets</Link>
        <Link to="/qui-sommes-nous">Qui sommes nous</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="flex gap-8">
        <Link to={user ? '/my-account' : '/login'} className="p-4">
          <FontAwesomeIcon icon={faUser} />
        </Link>
        <Link to="/cart" className="hidden p-4 md:inline">
          <FontAwesomeIcon icon={faCartShopping} />
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
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed z-50 inset-0 flex flex-col items-center space-y-12 bg-green-900 bg-opacity-100 py-20 md:hidden">
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
            to="/qui-sommes-nous"
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
            className="absolute right-8 top-0 text-white"
            onClick={handleMenuClick}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
