import {
  faCartShopping,
  faUser,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../../Cart/CartContext/CartContext';

function NavBar() {
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

  return (
    <nav className="bg-green-900 flex h-28 w-full items-center justify-between px-8 text-white md:px-8">
      <Link to="/">
        <img
          src="/images/logo-blanc-png.png"
          alt="Logo GreenRoots"
          className="h-12 md:h-16"
        />
      </Link>
      <div className="text-shadow l hidden space-x-20 text-xl md:flex md:text-xl  lg:text-2xl">
        <Link to="/projects">Nos projets</Link>
        <Link to="/qui-sommes-nous">Qui sommes nous</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="flex items-center space-x-4  lg:text-2xl lg:mr-10">
        <Link to="/register" className="hidden p-4 md:inline">
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
        <div className="fixed inset-0 flex flex-col items-center space-y-12 bg-green-900 bg-opacity-100 py-20 md:hidden">
          <Link to="/projects" className="text-lg text-white">
            Nos projets
          </Link>
          <Link to="/qui-sommes-nous" className="text-lg text-white">
            Qui sommes nous
          </Link>
          <Link to="/contact" className="text-lg text-white">
            Contact
          </Link>
          <Link to="/register" className="text-lg text-white">
            S&apos;incrire
          </Link>
          <Link to="/login" className="text-lg text-white">
            Se connecter
          </Link>
          <Link to="/cart" className="text-lg text-white">
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
