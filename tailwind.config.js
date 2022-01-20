/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

const lightbg = '#fff';
const darkbg = '#0f0e17';
const brand = '#9333EA';

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',

  theme: {
    extend: {
      colors: { brand, lightbg, darkbg },
      fontFamily: {
        sans: ['General Sans', 'Inter var', ...fontFamily.sans],
      },

      typography(theme) {
        return {
          // dark: {
          //   css: {
          //     color: theme('colors.gray.300'),
          //     '[class~="lead"]': { color: theme('colors.gray.400') },
          //     a: { color: theme('colors.gray.100') },
          //     strong: { color: theme('colors.gray.100') },
          //     'ul > li::before': { backgroundColor: theme('colors.gray.700') },
          //     hr: { borderColor: theme('colors.gray.800') },
          //     blockquote: {
          //       color: theme('colors.gray.100'),
          //       borderLeftColor: theme('colors.gray.800'),
          //     },
          //     h1: { color: theme('colors.gray.100') },
          //     h2: { color: theme('colors.gray.100') },
          //     h3: { color: theme('colors.gray.100') },
          //     h4: { color: theme('colors.gray.100') },
          //     code: { color: theme('colors.gray.100') },
          //     'a code': { color: theme('colors.gray.100') },
          //     pre: {
          //       color: theme('colors.gray.200'),
          //       backgroundColor: theme('colors.gray.800'),
          //     },
          //     thead: {
          //       color: theme('colors.gray.100'),
          //       borderBottomColor: theme('colors.gray.700'),
          //     },
          //     'tbody tr': { borderBottomColor: theme('colors.gray.800') },
          //   },
          // },
        };
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
