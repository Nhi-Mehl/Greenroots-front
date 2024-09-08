import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'; // Importation des icônes spécifiques
import { Link } from 'react-router-dom';

function Footer() {
  const elements = (
    <div className="flex flex-col">
      <figure className="mb-5">
        <img src="/images/logo-blanc-png.png" alt="footer's GreenRoots logo" />
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
  );
  // push test
  return (
    <footer className="p-20 bg-green-950 text-slate-50 text-sm flex flex-row justify-between leading-10">
      <div>
        <h3 className="text-xl">GreenRoots</h3>
        <p>Adresse :</p>
        <p>45 rue de la navette</p>
        <p>Greenroots@gmail.com</p>
        <p>(+33)6 14 78 96 32</p>
      </div>

      {elements}

      <div className="flex flex-col">
        <h4 className="text-xl">A propos</h4>
        <Link to="/projects">Nos projets</Link>
        <Link to="/qui-sommes-nous">A propos de nous</Link>
        <Link to="/mentions-legales">Mentions légales</Link>
        <Link to="/contact">Nous contacter</Link>
      </div>
    </footer>
  );
}

export default Footer;
