import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { TiTick, TiTimes } from 'react-icons/ti';

import Form from '../../Form/Form';
import Input from '../../Form/Input/Input';
import Button from '../../Form/Button/Button';

import { SignUpRequest } from '../../../@types/Credentials';
import { useRegisterMutation } from '../../../store/features/auth/authApiSlice';

const requirePassword = [
  { regex: /.{8,}/, label: 'Avoir au moins 8 caractères' },
  { regex: /[0-9]/, label: 'Inclure au moins un chiffre' },
  { regex: /[a-z]/, label: 'Inclure au moins une lettre minuscule' },
  { regex: /[A-Z]/, label: 'Inclure au moins une lettre majuscule' },
  {
    regex: /[$&+,:;=?@#|'<>.^*()%!-]/,
    label: 'Inclure au moins un caractère spécial',
  },
];

function validatePassword(password: string) {
  return requirePassword.map(({ regex, label }) => ({
    label,
    isValid: regex.test(password),
  }));
}

function RegisterPage() {
  const navigate = useNavigate();

  // Mutation pour l'inscription de l'utilisateur
  const [
    createUser,
    {
      isLoading: isLoadingRegister,
      isSuccess: isSuccessRegister,
      isError: isErrorRegister,
      error: registerError,
    },
  ] = useRegisterMutation();

  // États du formulaire pour gérer les entrées utilisateur
  const [formData, setFormData] = useState<SignUpRequest>({
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

  // État du message d'erreur pour affichage utilisateur
  const [passewordError, setPassewordError] = useState<string>('');
  const [passwordValidation, setPasswordValidation] = useState(
    validatePassword('')
  );

  // Calcul du nombre de critères validés et du pourcentage de progression
  const validCount = passwordValidation.filter(({ isValid }) => isValid).length;
  const progressPercentage = (validCount / requirePassword.length) * 100;
  let progressColor = 'bg-green-500';
  if (progressPercentage < 40) {
    progressColor = 'bg-red-500';
  } else if (progressPercentage < 80) {
    progressColor = 'bg-yellow-500';
  }

  /** ===================== ✅ GESTION DES SUCCES ===================== */

  useEffect(() => {
    if (isSuccessRegister) {
      // Affichage du message de succès
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Inscription réussie',
        text: `Félicitations ${formData?.first_name} ! Vous êtes maintenant inscrit sur notre plateforme`,
        showConfirmButton: false,
        timer: 3000,
      });

      // Rediriger vers la page d'accueil après un court délai
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [isSuccessRegister, formData, navigate]);

  /** ===================== ❌ GESTION DES ERREURS ===================== */

  useEffect(() => {
    if (isErrorRegister) {
      let errorRegisterMessage = 'Une erreur est survenue, veuillez réessayer.';
      if (registerError && 'data' in registerError) {
        errorRegisterMessage =
          (registerError as { data?: { message?: string } })?.data?.message ||
          errorRegisterMessage;
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorRegisterMessage,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Réessayer',
      });
    }
  }, [isErrorRegister, registerError]);

  /** ===================== 🟢 GESTION DES CHANGEMENTS ===================== */
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      setPasswordValidation(validatePassword(value));
    }
  };

  /** ===================== ✍️ GESTION DE LA SOUMISSION DU FORMULAIRE ===================== */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Vérifier si les mots de passe correspondent
    if (formData?.password !== formData?.confirmation) {
      setPassewordError('Les mots de passe ne correspondent pas');
      return;
    }

    // Exécuter la mutation d'inscription
    createUser(formData);
  };

  return (
    <main className="px-4 py-10 sm:px-8 md:px-12 sm:py-12 md:py-28 m">
      {/* Section d'introduction */}
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

      {/* Formulaire d'inscription */}
      <section className="p-6 bg-white shadow-md border-2 border-greenRegular rounded-lg lg:max-w-[600px] lg:mx-auto">
        <Form action="/register" onSubmit={handleSubmit}>
          <div className="md:grid md:grid-cols-2 md:gap-x-6">
            {/* Champs du formulaire */}
            {[
              {
                label: 'Prénom',
                name: 'first_name',
                type: 'text',
                placeholder: 'Votre prénom',
              },
              {
                label: 'Nom',
                name: 'last_name',
                type: 'text',
                placeholder: 'Votre nom',
              },
              {
                label: 'Adresse',
                name: 'address',
                type: 'text',
                placeholder: 'Votre adresse',
              },
              {
                label: 'Code postal',
                name: 'zip_code',
                type: 'text',
                placeholder: 'Votre code postal',
              },
              {
                label: 'Ville',
                name: 'city',
                type: 'text',
                placeholder: 'Votre ville',
              },
              {
                label: 'Pays',
                name: 'country',
                type: 'text',
                placeholder: 'Votre pays',
              },
              {
                label: 'Téléphone',
                name: 'phone_number',
                type: 'text',
                placeholder: 'Votre téléphone',
              },
              {
                label: 'Email',
                name: 'email',
                type: 'email',
                placeholder: 'Votre email',
              },
              {
                label: 'Mot de passe',
                name: 'password',
                type: 'password',
                placeholder: 'Votre mot de passe',
              },
              {
                label: 'Confirmation de mot de passe',
                name: 'confirmation',
                type: 'password',
                placeholder: 'Confirmer votre mot de passe',
              },
            ].map((input) => (
              <Input
                key={input.name}
                htmlFor={input.name}
                label={input.label}
                type={input.type}
                name={input.name}
                id={input.name}
                placeholder={input.placeholder}
                value={formData[input.name as keyof SignUpRequest]}
                onChange={handleChange}
              />
            ))}

            {/* Message d'erreur si les mots de passe ne correspondent pas */}
            {passewordError && (
              <div className="col-span-2 text-red-600 text-center mb-4">
                {passewordError}
              </div>
            )}
          </div>

          {/* Barre de progression du mot de passe */}
          <div className="w-2/3 mx-auto bg-gray-200 h-2 rounded-full mb-4">
            <div
              style={{ width: `${progressPercentage}%` }}
              className={`${progressColor} h-full rounded-full transition-all duration-300`}
            />
          </div>

          {/* Validation du mot de passe */}
          <ul className="text-sm text-center mb-4">
            {passwordValidation.map(({ label, isValid }) => (
              <li
                key={label}
                className={
                  isValid ? 'text-greenRegular font-bold' : 'text-gray-400'
                }
              >
                {isValid ? (
                  <TiTick className="inline lg:text-lg" />
                ) : (
                  <TiTimes className="inline lg:text-lg" />
                )}{' '}
                {label}
              </li>
            ))}
          </ul>

          {/* Bouton de soumission */}
          <Button
            type="submit"
            variant="form"
            className="w-full"
            isLoading={isLoadingRegister}
            disabled={isLoadingRegister}
          >
            Valider
          </Button>
        </Form>
      </section>
    </main>
  );
}

export default RegisterPage;
