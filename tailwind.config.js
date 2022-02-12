/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

const lightbg = '#fff';
const darkbg = colors.neutral[900];
// const brand = '#F36163';
const brand = '#008cff';

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',

  theme: {
    extend: {
      colors: { brand, lightbg, darkbg, gray: colors.slate },
      fontFamily: {
        sans: ['Switzer', ...fontFamily.sans],
        head: ['Switzer', ...fontFamily.sans],
        cd: ['Clash Display', ...fontFamily.sans],
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
