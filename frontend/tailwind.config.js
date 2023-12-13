/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPink: '#FFB1DD',
        backgroundPink: '#FFD4EC',
      },
      fontFamily: {
        'josefin-sans': ['Josefin Sans', 'sans-serif'],
        'moo-lah-lah': ['Moo Lah Lah', 'cursive'], // Add the custom font here
      },
    },
  },
  plugins: [],
};
