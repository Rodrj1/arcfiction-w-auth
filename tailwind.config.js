const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '280px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        customgray: '#1a171e',
      },
    },
  },
  plugins: [],
};
