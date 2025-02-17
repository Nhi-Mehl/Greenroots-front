import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

interface InputProps {
  htmlFor: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder?: string;
  required?: boolean;
  name?: string;
  id?: string;
}

const Input = ({
  htmlFor,
  label,
  value,
  onChange,
  type,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === 'password';
  // Si c'est un champ password, on affiche le type "text" ou "password" selon l'état
  const inputType = isPasswordField && showPassword ? 'text' : type;

  return (
    <label
      htmlFor={htmlFor}
      className={`${isPasswordField ? 'flex flex-col' : ''}`}
    >
      {label}
      <input
        {...props}
        type={inputType}
        value={value}
        onChange={onChange}
        // Ajout d'un padding droit si c'est un champ password pour laisser de l'espace à l'icône
        className={`w-full border border-gray-300 rounded-md mb-2 px-4 py-2 placeholder:text-gray-400 focus:ring-2 focus:outline-none focus:ring-greenRegular md:mb-4 ${
          isPasswordField ? ' pr-8' : ''
        } `}
      />
      {isPasswordField && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="self-end -translate-y-10 mr-2 md:-translate-y-12 focus:outline-none"
        >
          {showPassword ? (
            <AiFillEyeInvisible className="h-5 w-5 text-gray-500" />
          ) : (
            <AiFillEye className="h-5 w-5 text-gray-500" />
          )}
        </button>
      )}
    </label>
  );
};

export default Input;
