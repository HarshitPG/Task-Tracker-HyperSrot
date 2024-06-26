/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "640px",
      lg: "768px",
      xl: "1024px",
      "2xl": "1280px",
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

// screens: {
//   sm: "480px",
//   md: "640px",
//   lg: "768px",
//   xl: "1024px",
//   "2xl": "1280px",
// },
