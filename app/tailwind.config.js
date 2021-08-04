module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    safelist: [
      "bg-gradient-to-bl",
      "bg-gradient-to-br",
      "bg-gradient-to-tl",
      "bg-gradient-to-tr",
      "from-blue-500",
      "from-blue-700",
      "from-pink-500",
      "from-pink-700",
      "from-purple-500",
      "from-purple-700",
      "from-red-500",
      "from-red-700",
      "from-yellow-500",
      "from-yellow-700",
      "to-blue-500",
      "to-blue-700",
      "to-pink-500",
      "to-pink-700",
      "to-purple-500",
      "to-purple-700",
      "to-red-500",
      "to-red-700",
      "to-yellow-500",
      "to-yellow-700",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
