/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#ea2a33",
        "primary-dark": "#c91e26",
        "background-light": "#f8f6f6",
        "background-dark": "#211111",
        "surface-light": "#ffffff",
        "surface-dark": "#2d1b1b",
        "text-primary-light": "#181111",
        "text-primary-dark": "#f4f0f0",
        "text-secondary-light": "#886364",
        "text-secondary-dark": "#b08c8d",
        "border-light": "#e5dcdc",
        "border-dark": "#3e2c2c"
      },
      fontFamily: {
        display: ["Lexend", "sans-serif"],
        body: ["Lexend", "sans-serif"]
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
    },
  },
  plugins: [],
}
