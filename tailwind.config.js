/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/app/(pages)/**/*.{js,ts,jsx,tsx}',
    './src/app/components/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        logo: {
          100: '#ecdad3',
          200: '#FCF9F2',
          300: '#fc4c0026',
          400: '#b26d4d',
          500: '#9f4821',
          600: '#7f3a1a',
          700: '#9F4821',
          800: '#401d0d',
          900: '#200e07',
        },
      },
      height: {
        photo: '247 px',
      },
    },
  },
  plugins: [
    require('rippleui'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
