import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
        'secondary-gray': '#454F5B',
        'teritary-gray': '#5A7184',
        'fill-gray': '#637381',
        'secondary-fill-gray': '#8181A5',
        'primary-red': '#DE3618',
        'light-red': '#e8a79b',
        'light-blue': '#47C1BF',
        'ligher-blue': 'rgba(71, 193, 191, 0.5)',
        'primary-purple': '#43467F',
        'primary-indigo': '#5C6AC4',
        'primary-blue': '#006FBB',
        'hover-light-blue': 'rgba(94, 129, 244, 0.1)',
      },
      boxShadow: {
        'flash-sale-shadow': '#47C1BF 0px 7px 29px 0px',
      },
    },
  },
  plugins: [],
};
export default config;
