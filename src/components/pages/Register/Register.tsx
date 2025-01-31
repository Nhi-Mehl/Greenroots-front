import { useState } from 'react';
import { IUser } from '../../../@types';
import Form from '../../Form/Form';
import Input from '../../Form/Input/Input';
import Button from '../../Form/Button/Button';

function RegisterPage() {
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
        <Form action="/register" onSubmit={handleSubmit}>
          <div className="md:grid md:grid-cols-2 md:gap-x-6">
            {/* Message d'erreur si les mots de passe ne correspondent pas */}
            {errorMessage && (
              <div className="col-span-2 text-red-600 mb-4">{errorMessage}</div>
            )}

            <Input
              htmlFor="first_name"
              label="Prénom"
              type="text"
              name="first_name"
              id="first_name"
              placeholder="Votre prénom"
              value={formData.first_name}
              onChange={handleChange}
            />
            <Input
              htmlFor="last_name"
              label="Nom"
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Votre nom"
              value={formData.last_name}
              onChange={handleChange}
            />
            <Input
              htmlFor="address"
              label="Adresse"
              type="text"
              name="address"
              id="address"
              placeholder="Votre adresse"
              value={formData.address}
              onChange={handleChange}
            />
            <Input
              htmlFor="zip_code"
              label="Code postal"
              type="text"
              name="zip_code"
              id="zip_code"
              placeholder="Votre code postal"
              value={formData.zip_code}
              onChange={handleChange}
            />
            <Input
              htmlFor="city"
              label="Ville"
              type="text"
              name="city"
              id="city"
              placeholder="Votre ville"
              value={formData.city}
              onChange={handleChange}
            />

            <Input
              htmlFor="country"
              label="Pays"
              type="text"
              name="country"
              id="country"
              placeholder="Votre pays"
              value={formData.country}
              onChange={handleChange}
            />
            <Input
              htmlFor="phone_number"
              label="Téléphone"
              type="text"
              name="phone_number"
              id="phone_number"
              placeholder="Votre téléphone"
              value={formData.phone_number}
              onChange={handleChange}
            />

            <Input
              htmlFor="email"
              label="Email"
              type="email"
              name="email"
              id="email"
              placeholder="Votre email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              htmlFor="password"
              label="Mot de passe"
              type="password"
              name="password"
              id="password"
              placeholder="Votre mot de passe"
              value={formData.password}
              onChange={handleChange}
            />
            <Input
              htmlFor="confirmation"
              label="Confirmation de mot de passe"
              type="password"
              name="confirmation"
              id="confirmation"
              placeholder="Confirmez votre mot de passe"
              value={formData.confirmation}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" variant="form">
            Valider
          </Button>
        </Form>
      </section>
    </main>
  );
}

export default RegisterPage;
