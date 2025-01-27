import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../../context/UserContext';
import api from '../../../api/index';

interface FormDataProps {
  email: string;
  password: string;
}

function LoginPage() {
  const navigate = useNavigate();
  // const location = useLocation(); // Obtenir l'URL actuelle
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setUser, user } = useUser();

  // s'authentifier en fournissant les identifiants
  const authenticate = async (formData: FormDataProps) => {
    try {
      const response = await api.post('/auth/login', formData);
      console.log('reponse', response);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.accessToken);

        const userResponse = await api.get(`/users/profil`);
        console.log('userReponse', userResponse);

        if (userResponse.status === 200) {
          setUser(userResponse.data);
        }
      }
    } catch (error: import('axios').AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        alert(error?.response?.data.message);
      }
    }
  };
  console.log('user avant userEffect', user);

  // This useEffect will redirect the user to the profile page if they are already authenticated
  useEffect(() => {
    if (user) {
      console.log('User dans useEffect', user);
      navigate('/my-account');
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    // on veut juste le contenu des champs

    const data: FormDataProps = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    console.log('Form submitted:', data); // Log pour vérifier les données soumises
    authenticate(data);
  };

  return (
    <main className="px-4 py-10 min-h-screen sm:px-8 md:pt-24 sm:py-12">
      <section className="p-8 mb-10 border-2 border-solid border-greenRegular rounded-lg bg-white shadow-md lg:max-w-[900px] lg:mx-auto">
        <h1 className="h2-title text-3xl text-greenRegular text-center mb-6 lg:text-5xl">
          Connectez-vous
        </h1>
        <p className="text-sm text-justify sm:text-base md:text-lg lg:text-xl">
          Connectez-vous pour accéder à votre compte, suivre vos achats d'arbres
          et voir l&apos;impact de vos contributions. Rejoignez la communauté et
          continuez à agir pour la reforestation.
        </p>
      </section>
      <section className="p-6 bg-white shadow-md border-2 border-greenRegular rounded-lg lg:max-w-[600px] lg:mx-auto">
        <form action="/login" onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email
            <input
              value={email}
              type="email"
              id="email"
              name="email"
              placeholder="Votre email"
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </label>

          <label htmlFor="password">
            Mot de passe
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="Votre mot de passe"
              className="input"
            />
          </label>

          <button className="btn-form mt-4" type="submit">
            Connexion
          </button>
        </form>
        <div className="flex flex-col items-center gap-2 mt-4">
          <Link to="/register" className="text-greenRegular">
            Cliquez ici pour vous inscrire
          </Link>
          {/* <Link to="/forgot-password" className=" text-red-600">
            Mot de passe oublié
          </Link> */}
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
