import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NavBar() {
  return (
    <nav className="bg-green-950 h-32 text-white flex flex-row items-center justify-between z-10 w-full">
      <div className="ml-16 w-14">
        <img src="/images/logo-blanc-png.png" alt="Tree logo" />
      </div>
      <div>
        <ul className="flex flex-row gap-8">
          <li>
            <a className="p-4" href="/">
              Nos projets
            </a>
          </li>
          <li>
            <a className="p-4" href="/">
              Qui sommes nous
            </a>
          </li>
          <li>
            <a className="p-4" href="/">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className="flex gap-8 mr-16">
        <a className="p-4" href="/">
          <FontAwesomeIcon icon={faUser} />
        </a>
        <a className="p-4" href="/">
          <FontAwesomeIcon icon={faCartShopping} />
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
