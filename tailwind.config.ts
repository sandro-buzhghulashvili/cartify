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
      },
      fontSize: {
        medium: '28px',
      },
      colors: {
        'primary-black': '#161D25',
        'primary-gray': '#959EAD',
        'secondary-gray': '#454F5B',
        'primary-red': '#DE3618',
      },
    },
  },
  plugins: [],
};
export default config;
