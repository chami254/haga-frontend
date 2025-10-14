export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fff9e6",
          100: "#ffedb3",
          300: "#ffd65c",
          500: "#ffbf00",
          700: "#b38600",
        },
        dark: {
          50: "#f1f1f1",
          100: "#cfcfcf",
          500: "#1a1a1a",
          700: "#0d0d0d",
          900: "#000000",
        },
      },
    },
  },
  plugins: [],
};
