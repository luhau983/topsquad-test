/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
  theme: {
    extend: {
      colors: {
        'primary-1': '#FFBC37',
        'primary-2': '#83bf6e',
        'primary-3': '#ff6a55',
        'primary-4': '#bba3ef',
        'secondary-1': '#ffbc99',
        'secondary-2': '#CABDFF',
        'secondary-3': '#b1e5fc',
        'secondary-4': '#b5e4ca',
        'secondary-5': '#ffd88d',
        'neutral-0': '#1b1b1b',
        'neutral-1': '#fcfcfc',
        'neutral-2': '#f4f4f4',
        'neutral-3': '#efefef',
        'neutral-4': '#6f767e',
        'neutral-5': '#33383f',
        'neutral-6': '#272b30',
        'neutral-7': '#1A1D1F ',
        'neutral-8': '#111315',
        'neutral-9': '#9a9fa5',
      },
      boxShadow: {
        button:
          'inset 0px -1px 1px rgba(0, 0, 0, 0.04),inset 0px 2px 0px rgba(255, 255, 255, 0.25), 0px 4px 8px rgba(0, 0, 0, 0.25)',
        card: '0px 32px 48px -8px rgba(0, 0, 0, 0.05), 0px 0px 14px -4px rgba(0, 0, 0, 0.05)',
        depth: '0px 32px 48px -8px rgba(0, 0, 0, 0.10), 0px 0px 14px -4px rgba(0, 0, 0, 0.05)',
      },
    },
  },
};
