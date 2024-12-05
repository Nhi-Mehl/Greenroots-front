import { useState } from 'react';
import { IUser } from '../../@types';

function Register() {
  // Etats des valeurs du formulaire
  const [formData, setFormData] = useState<IUser>({
    id: '',
    first_name: '',
    last_name: '',
    address: '',
    zip_code: '',
    city: '',
    country: '',
    phone_number: '',
    email: '',
    // password: '',
    // confirmation: '',
  });

  // Etat de succès ou d'erreur
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Changements dans les inputs

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Vérification du mot de passe
    if (formData.password !== formData.confirmation) {
      setErrorMessage('Les mots de passe ne correspondent pas');
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.error("Erreur lors de l'inscription");
        return;
      }

      setIsRegistered(true);
    } catch (error) {
      console.error('erreur pendant la requête', error);
    }
  };

  if (isRegistered) {
    return (
      <div className="p-20">
        <div className="flex flex-col items-center border-2 border-solid border-green-950 bg-emerald-50 p-10">
          <h1 className="text-3xl mb-4">Inscription réussie</h1>
          <p className="text-lg">
            Félicitations {formData.first_name} ! Vous êtes maintenant inscrit
            sur notre plateforme.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="px-4 py-10 sm:px-8 md:px-12 sm:py-12 md:py-28">
      <section className="p-8 mb-10 border-2 border-solid border-greenRegular rounded-lg bg-white shadow-md lg:max-w-[900px] lg:mx-auto">
        <h1 className="h2-title text-3xl text-greenRegular text-center mb-6 lg:text-5xl">
          Inscrivez-vous
        </h1>
        <p className="text-sm text-justify sm:text-base md:text-lg lg:text-xl">
          Inscrivez-vous pour acheter des arbres et suivre vos contributions.
          Créez un compte pour accéder à votre historique d&apos;achats et
          recevoir des mises à jour sur l&apos;impact de vos actions. Rejoignez
          notre communauté engagée dans la reforestation.
        </p>
      </section>
      <section className="p-6 bg-white shadow-md border-2 border-greenRegular rounded-lg lg:max-w-[600px] lg:mx-auto">
        <form action="/register" onSubmit={handleSubmit}>
          <div className="md:grid md:grid-cols-2 md:gap-x-6">
            {/* Message d'erreur si les mots de passe ne correspondent pas */}
            {errorMessage && (
              <div className="col-span-2 text-red-600 mb-4">{errorMessage}</div>
            )}

            <label htmlFor="first_name">
              Prénom
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="Votre prénom"
                value={formData.first_name}
                onChange={handleChange}
                className="input"
              />
            </label>
            <label htmlFor="last_name">
              Nom
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Votre nom"
                value={formData.last_name}
                onChange={handleChange}
                className="input"
              />
            </label>
            <label htmlFor="address">
              Adresse
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Votre adresse"
                value={formData.address}
                onChange={handleChange}
                className="input"
              />
            </label>
            <label htmlFor="zip_code">
              Code postal
              <input
                type="text"
                id="zip_code"
                name="zip_code"
                placeholder="Votre code postal"
                value={formData.zip_code}
                onChange={handleChange}
                className="input"
              />
            </label>
            <label htmlFor="city">
              Ville
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Votre ville"
                value={formData.city}
                onChange={handleChange}
                className="input"
              />
            </label>
            <label htmlFor="country">
              Pays
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Votre pays"
                value={formData.country}
                onChange={handleChange}
                className="input"
              />
            </label>
            <label htmlFor="phone_number">
              Téléphone
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                placeholder="Votre téléphone"
                value={formData.phone_number}
                onChange={handleChange}
                className="input"
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Votre email"
                value={formData.email}
                onChange={handleChange}
                className="input"
              />
            </label>
            <label htmlFor="password">
              Mot de passe
              <input
                type="text"
                id="password"
                name="password"
                placeholder="Votre mot de passe"
                value={formData.password}
                onChange={handleChange}
                className="input"
              />
            </label>
            <label htmlFor="confirmation">
              Confirmation de mot de passe
              <input
                type="password"
                id="confirmation"
                name="confirmation"
                placeholder="Confirmez votre mot de passe"
                value={formData.confirmation}
                onChange={handleChange}
                className="input"
              />
            </label>
          </div>
          <button type="submit" className="btn-form mt-4">
            Valider
          </button>
        </form>
      </section>
    </main>
  );
}

export default Register;
