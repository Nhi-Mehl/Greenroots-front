import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset'; // Types standards des boutons
  variant?: 'form' | 'default';
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
        'font-montserrat bg-greenRegular text-white font-semibold text-xs md:text-sm lg:text-base py-2 px-3 md:py-3 md:px-4 lg:py-4 lg:px-5',
        {
          'w-full rounded-full': variant === 'form',
          'w-fit rounded-lg lg:rounded-xl': variant === 'default',
        },
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Chargement...' : children}
    </button>
  );
};

export default Button;
