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
    password: '',
    confirmation: '',
  });

  // Etat de succès ou d'erreur
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Changements dans les inputs

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
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
      const result = await response.json();

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
    <div className="p-4 my-8">
      <div className="flex flex-col my-10 items-center border-2 border-solid border-green-950 bg-emerald-50 lg:max-w-[1024px] lg:m-auto lg:my-20">
        <h1 className="text-3xl p-4 lg:text-5xl">Inscrivez-vous</h1>
        <p className="w-5/6 p-2 text-sm text-center lg:text-lg">
          Inscrivez-vous pour acheter des arbres et suivre vos contributions.
          Créez un compte pour accéder à votre historique d&apos;achats et
          recevoir des mises à jour sur l&apos;impact de vos actions. Rejoignez
          notre communauté engagée dans la reforestation.
        </p>
      </div>
      <div className="flex justify-center lg:max-w-[1024px] lg:m-auto">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-8 w-full p-6 border-2 border-solid border-green-950 bg-emerald-50"
          action="/register"
          onSubmit={handleSubmit}
        >
          {/* Message d'erreur si les mots de passe ne correspondent pas */}
          {errorMessage && (
            <div className="col-span-2 text-red-600 mb-4">{errorMessage}</div>
          )}

          <div className="flex flex-col">
            <label className="mb-2 text-sm lg:text-base" htmlFor="first_name">
              Prénom
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Votre prénom"
              value={formData.first_name}
              onChange={handleChange}
              className=" w-full rounded-md mb-3 border-0 py-2 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm lg:text-base" htmlFor="last_name">
              Nom
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Votre nom"
              value={formData.last_name}
              onChange={handleChange}
              className=" w-full rounded-md mb-3 border-0 py-2 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm lg:text-base" htmlFor="address">
              Adresse
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Votre adresse"
              value={formData.address}
              onChange={handleChange}
              className=" w-full rounded-md mb-3 border-0 py-2 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm lg:text-base" htmlFor="zip_code">
              Code postal
            </label>
            <input
              type="text"
              id="zip_code"
              name="zip_code"
              placeholder="Votre code postal"
              value={formData.zip_code}
              onChange={handleChange}
              className=" w-full rounded-md mb-3 border-0 py-2 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm lg:text-base" htmlFor="city">
              Ville
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Votre ville"
              value={formData.city}
              onChange={handleChange}
              className=" w-full rounded-md mb-3 border-0 py-2 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm lg:text-base" htmlFor="country">
              Pays
            </label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Votre pays"
              value={formData.country}
              onChange={handleChange}
              className=" w-full rounded-md mb-3 border-0 py-2 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm lg:text-base" htmlFor="phone_number">
              Téléphone
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              placeholder="Votre téléphone"
              value={formData.phone_number}
              onChange={handleChange}
              className=" w-full rounded-md mb-3 border-0 py-2 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm lg:text-base" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Votre email"
              value={formData.email}
              onChange={handleChange}
              className=" w-full rounded-md mb-3 border-0 py-2 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm lg:text-base" htmlFor="password">
              Mot de passe
            </label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Votre mot de passe"
              value={formData.password}
              onChange={handleChange}
              className=" w-full rounded-md mb-3 border-0 py-2 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm lg:text-base" htmlFor="confirmation">
              Confirmation de mot de passe
            </label>
            <input
              type="password"
              id="confirmation"
              name="confirmation"
              placeholder="Confirmez votre mot de passe"
              value={formData.confirmation}
              onChange={handleChange}
              className=" w-full rounded-md mb-2 border-0 py-2 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full rounded-md border-0 p-1.5  text-gray-100 ring-1 ring-inset bg-green-900"
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
