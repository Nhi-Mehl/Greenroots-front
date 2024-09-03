/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: 'var(--white-color)',
        beige: 'var(--beige-color)',
        greenLight: 'var(--green-light-color)',
        greenRegular: 'var(--green-regular-color)',
        greenDark: 'var(--green-dark-color)',
        greenExtraDark: 'var(--green-extra-dark-color)',
        dark: 'var(--dark-color)',
      },
    },
  },
  plugins: [],
};
