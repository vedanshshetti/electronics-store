const { heroui } = require('@heroui/theme');

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/react/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/circular-progress.js",
    "./other/**/*.{js,ts,jsx,tsx}",
    ...heroui() // This dynamically includes HeroUI theme paths
  ],
  theme: {
    extend: {
      screens: {
        xs: "360px",   // Custom small screen
        xxl: "1600px"  // Custom large screen
      }
    }
  },
  plugins: [],
  darkMode: "class",
};