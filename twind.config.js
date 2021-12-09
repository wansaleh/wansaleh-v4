import { fontFamily } from 'tailwindcss/defaultTheme';

const brand = '#f16522';

/** @type {import('twind').Configuration} */
const config = {
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
      colors: { brand },
    },
  },
};

export default config;
