/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["LATO", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "Primaire": "#FD2D01",
        "Secondaire": "#FFD7D7",
        "Tertiaire": "#4E5166",
      },
    },


    plugins: [
      require('@tailwindcss/forms'),
    ],
  }
}