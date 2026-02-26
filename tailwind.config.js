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
        primary: "#D4AF37",
        "primary-dark": "#AA8C2C",
        "background-light": "#f5f6f8",
        "background-dark": "#111318",
        "card-dark": "#1a1d24",
        "text-muted": "#9ca6ba",
        "surface-light": "#ffffff",
        "surface-dark": "#1a1d24",
        "text-primary-light": "#111318",
        "text-primary-dark": "#ffffff",
        "text-secondary-light": "#9ca6ba",
        "text-secondary-dark": "#9ca6ba",
        "border-light": "#e5e7eb",
        "border-dark": "#ffffff1a"
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Space Grotesk", "sans-serif"]
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(rgba(17, 19, 24, 0.7), rgba(17, 19, 24, 0.9))",
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
