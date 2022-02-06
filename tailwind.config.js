/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

const lightbg = '#fff';
const darkbg = '#080807';
// const brand = '#F36163';
const brand = colors.sky[500];

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',

  theme: {
    extend: {
      colors: { brand, lightbg, darkbg, gray: colors.slate },
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans],
        head: ['Inter var', ...fontFamily.sans],
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
