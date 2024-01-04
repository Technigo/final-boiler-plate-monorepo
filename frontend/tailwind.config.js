/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#353c3d",
        secondary: "#bbd3d7",
      },
    },
  },
  plugins: [],
};
