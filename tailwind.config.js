/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        hind: ['Hind', 'sans-serif'],
      },
      fontSize: {
        // px/16=rem
        h1: '4rem', // 64px
        h2: '3rem', // 48 px
        h3: '1.5rem', // 24px
        sectionText: '1.25rem', // 18px
        regularText: '1rem', // 16px
      },
      fontWeight: {
        bold: '700',
      },
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
