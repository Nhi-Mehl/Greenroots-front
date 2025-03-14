import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset'; // Types standards des boutons
  variant?: 'form' | 'form-danger' | 'default';
  className?: string;
  isLoading?: boolean;
}

const Button = ({
  children,
  type = 'button',
  variant = 'default',
  className = '',
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        'font-montserrat text-white font-semibold text-sm md:text-lg py-3 px-3 md:py-3 md:px-4 lg:px-5',
        {
          'bg-greenRegular w-full rounded-full': variant === 'form',
          'bg-black w-full rounded-full': variant === 'form-danger',
          'bg-greenRegular w-fit rounded-xl lg:rounded-2xl':
            variant === 'default',
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Chargement...' : children}
    </button>
  );
};

export default Button;
