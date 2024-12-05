import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'; // Importation des icônes spécifiques
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="flex flex-col justify-between bg-greenDark p-20 text-sm leading-8 text-slate-50 md:flex-row md:leading-10">
      <div className="mb-10 text-center md:mb-0 md:mt-0 md:w-40">
        <h3 className=" mb-4 text-xl">GreenRoots</h3>
        <p>Adresse :</p>
        <p>45 rue de la navette</p>
        <p>Greenroots@gmail.com</p>
        <p>(+33)6 14 78 96 32</p>
      </div>

      <div className="order-first mb-10 flex flex-col items-center md:order-none md:mb-0 md:w-40">
        <figure className="mb-5">
          <img
            className="m-auto w-24 md:w-32"
            src="/images/logo-blanc-png.png"
            alt="footer's GreenRoots logo"
          />
        </figure>
        <p className="text-center">
          <FontAwesomeIcon icon={faTwitter} /> Twitter
        </p>
        <p className="text-center">
          <FontAwesomeIcon icon={faFacebook} /> Facebook
        </p>
        <p className="text-center">
          <FontAwesomeIcon icon={faInstagram} /> Instagram
        </p>
        <p className="text-center">
          <FontAwesomeIcon icon={faLinkedin} /> Linkedin
        </p>
      </div>

      <div className="flex flex-col text-center md:w-40">
        <h3 className="mb-4 text-xl">A propos</h3>
        <Link className="mb-2" to="/projects">
          Nos projets
        </Link>
        <Link className="mb-2" to="/qui-sommes-nous">
          A propos de nous
        </Link>
        <Link className="mb-2" to="/mentions-legales">
          Mentions légales
        </Link>
        <Link className="mb-2" to="/contact">
          Nous contacter
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
