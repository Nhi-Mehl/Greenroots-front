import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../Cart/CartContext/CartContext';
import { useUser } from '../../../context/UserContext';

function NavBar() {
  const { user } = useUser();
  const { cartItems } = useContext(CartContext);

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="bg-green-950 h-32 text-white flex flex-row items-center justify-between z-10 w-full">
      <Link to="/" className="ml-16 w-14">
        <img src="/images/logo-blanc-png.png" alt="Tree logo" />
      </Link>
      <div>
        <ul className="flex flex-row gap-8">
          <li>
            <Link to="/projects" className="p-4">
              Nos projets
            </Link>
          </li>
          <li>
            <Link to="/qui-sommes-nous" className="p-4">
              Qui sommes nous
            </Link>
          </li>
          <li>
            <Link to="/contact" className="p-4">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex gap-8 mr-16">
        <Link to={user ? '/my-account' : '/login'} className="p-4">
          <FontAwesomeIcon icon={faUser} />
        </Link>
        <Link to="/cart" className="p-4 relative">
          <FontAwesomeIcon icon={faCartShopping} />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
