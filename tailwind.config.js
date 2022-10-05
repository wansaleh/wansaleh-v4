/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

const lightbg = '#fff';
const darkbg = '#0f0e17';
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
        sans: ['Inter var', ...fontFamily.sans],
        head: ['Inter var', ...fontFamily.sans],
        cd: ['Inter var', 'Clash Display', ...fontFamily.sans],
      },
      maxWidth: {
        '8xl': '90rem',
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),

    plugin(({ addUtilities, theme }) => {
      addUtilities({
        '.layout': {
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
          maxWidth: theme('maxWidth.7xl'),
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
        },
      });
    }),
  ],
};
