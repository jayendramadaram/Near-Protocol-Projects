/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backdropFilter: {
        none: "none",
        blur: "blur(30px)",
      },
    },
    minHeight: {
      "1/2": "60px",
    },
  },
  plugins: [require("tailwindcss-filters")],
};
