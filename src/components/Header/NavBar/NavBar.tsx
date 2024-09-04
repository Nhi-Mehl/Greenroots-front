import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function NavBar() {
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
        <Link to="/login" className="p-4">
          <FontAwesomeIcon icon={faUser} />
        </Link>
        <Link to="/register" className="p-4">
          <FontAwesomeIcon icon={faCartShopping} />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
