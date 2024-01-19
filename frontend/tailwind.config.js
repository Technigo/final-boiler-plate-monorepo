/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    fontFamily: {
      display: ["Megrim", "Courier New", "monospace"],
      text: ["Poppins", "Arial", "sans-serif"],
      jp: ["Hannari", "sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        red: {
          light: "#F5B9B0",
          default: "#E55039",
          dark: "#B7402E",
        },
        blue: {
          light: "#92A5D7",
          default: "#4A69BD",
          dark: "#25355F",
        },
        yellow: {
          light: "#FAD589",
          default: "#F6B93B",
          dark: "#7B5D1E",
        },
        green: {
          light: "#AEECBC",
          default: "#78E08F",
          dark: "#3C7048",
        },
        sky: {
          light: "#A0C8D7",
          default: "#60A3BC",
          dark: "#30525E",
        },
      },
      keyframes: {
        slideIn: {
          "0%": {
            transform: "translateX(-100px) ",
          },
          "100%": { transform: "translate X(0) " },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        slideIn: "slideIn .8s ease ",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
