/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "Montserrat": ["Montserrat", "sans-serif"],
        "Mulish": ["Mulish", "sans-serif"],
        "Dancing": ["Dancing Script", "cursive"],
      }
    },
  },
  plugins: [
  ],
};
