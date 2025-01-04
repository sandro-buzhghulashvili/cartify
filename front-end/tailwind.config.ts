import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1865px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        black_to_purple:
          'linear-gradient(180deg, rgba(96,5,181,1) 0%, rgba(9,9,121,1) 17%, rgba(22,29,37,1) 40%, rgba(22,29,37,1) 95%, rgba(96,5,181,1) 100%)',
      },
      fontSize: {
        medium: '28px',
      },
      colors: {
        'primary-black': '#161D25',
        'primary-gray': '#959EAD',
        'primary-yellow': '#EEC200',
        'secondary-gray': '#454F5B',
        'teritary-gray': '#5A7184',
        'fill-gray': '#637381',
        'secondary-fill-gray': '#8181A5',
        'primary-red': '#DE3618',
        'light-red': '#e8a79b',
        'light-blue': '#47C1BF',
        'ligher-blue': 'rgba(71, 193, 191, 0.5)',
        'primary-purple': '#43467F',
        'secondary-blue': '#5E81F4',
        'primary-indigo': '#5C6AC4',
        'primary-blue': '#006FBB',
        'hover-light-blue': 'rgba(94, 129, 244, 0.1)',
        'backdrop-black': 'rgba(0,0,0,0.7)',
        'primary-green': '#58D020',
        'light-green': '#D3F3C5',
        'light-indigo': 'rgba(92, 106, 196, 0.5)',
      },
      boxShadow: {
        'flash-sale-shadow': '#5C6AC4 0px 7px 29px 0px',
        'bottom-shadow': 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      },
      keyframes: {
        wiggle: {
          '0%': { height: '0px' },
          '100%': { height: '100%' },
        },
        modalIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(100px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        modalOut: {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(100px)',
          },
        },
        dropDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-100%)',
          },
          '40%': {
            opacity: '0.2',
            transform: 'translateY(-100%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        closeDropDown: {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '40%': {
            opacity: '0.2',
            transform: 'translateY(-100%)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-100%)',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 0.5s ease-in-out',
        modalIn: 'modalIn 0.5s ease',
        modalOut: 'modalOut 0.6s ease',
        dropDown: 'dropDown 0.5s ease',
        closeDropDown: 'closeDropDown 0.5s ease',
      },
    },
  },
  plugins: [],
};
export default config;
