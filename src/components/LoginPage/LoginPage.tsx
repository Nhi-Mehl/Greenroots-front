import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import api from '../../api';

interface FormDataProps {
  email: string;
  password: string;
}

function Login() {
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

        const userResponse = await api.get(`/users/${response.data.id}`);
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
      navigate(-1);
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
    <main className="p-20">
      <section className="text-center mb-32 items-center border-2 border-solid border-greenRegular bg-emerald-50">
        <h1 className="text-3xl p-6">Connectez-vous</h1>
        <p className="w-1/2 p-6 mx-auto">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad eveniet
          at totam perferendis, blanditiis minus maxime id architecto sapiente
          ut omnis aliquam nemo autem explicabo sequi libero adipisci aliquid
          maiores.
        </p>
      </section>
      <section className="flex justify-center">
        <form
          className="w-2/5 p-14 border-2 border-solid border-greenRegular bg-emerald-50 "
          action="/login"
          onSubmit={handleSubmit}
        >
          <label className="mb-2" htmlFor="email">
            Email
            <input
              value={email}
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className=" w-full rounded-md mb-3 border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </label>

          <label className="mb-2" htmlFor="password">
            Mot de passe
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="Votre mot de passe"
              className=" w-full rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </label>

          <button
            className="w-full mt-8 text-slate-50 rounded-md border-0 p-2 bg-green-900"
            type="submit"
          >
            Connexion
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
