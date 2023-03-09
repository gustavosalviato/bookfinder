/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Roboto", "san-serif"],
    },

    extend: {
      colors: {
        background: "#16161A",
        headline: "#FFFFFE",
        secondary: "# 72757E",
        shape: "#202024",
        highlight: "#7F5AF0",
        tertiary: "#2CB67D",
        paragraph: "#94A1B2",
        gray900: "#121214",
      },
    },
  },
  plugins: [],
};
