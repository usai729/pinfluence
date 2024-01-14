/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        logo: ["Pacifico", "cursive"],
        name: ["Dancing Script", "cursive"],
        para: ["Fira Sans", "sans - serif"],
        otherNames: ["Roboto Flex", "sans - serif"],
        emoji: ["Noto Emoji", "sans - serif"],
      },
      colors: {
        primary: "#000080",
        secondary: "#FF00FF",
        accent: "#800000",
        text: "#405DE6",
        btnHover: "#2d5ff5",
        bgwhite: "#f8eeec",
        frost: "#fbfcfb",
        navyblue: "	#3e3d53",
        lightgray: "#d3d3d3",
      },
    },
    borderWidth: {
      0: "0px",
      1: "1px",
      2: "2px",
      3: "3px",
      4: "4px",
      5: "5px",
      6: "6px",
      7: "7px",
      8: "8px",
      9: "9px",
      10: "10px",
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
