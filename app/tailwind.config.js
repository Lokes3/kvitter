module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "bg-gradient-to-tr",
    "bg-gradient-to-tl",
    "bg-gradient-to-br",
    "bg-gradient-to-bl",
    "from-blue-500",
    "from-red-500",
    "from-yellow-500",
    "from-purple-500",
    "from-pink-500",
    "to-blue-500",
    "to-red-500",
    "to-yellow-500",
    "to-purple-500",
    "to-pink-500",
  ],
};
