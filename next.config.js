/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,

  // Uncoment to add domain whitelist
  images: {
    domains: [
      'res.cloudinary.com',
      'dkg-ik.b-cdn.net',
      'dkg-is1.b-cdn.net',
      'dkg-is2.b-cdn.net',
      'dkg-is3.b-cdn.net',
      'dkg-is4.b-cdn.net',
      'dkg-is5.b-cdn.net',
      'dkg-scdn.b-cdn.net',
      'dkg-ytimg.b-cdn.net',
    ],
  },

  // webpack: (config, { dev, isServer }) => {
  //   // Replace React with Preact only in client production build
  //   if (!dev && !isServer) {
  //     Object.assign(config.resolve.alias, {
  //       react: 'preact/compat',
  //       'react-dom/test-utils': 'preact/test-utils',
  //       'react-dom': 'preact/compat',
  //     });
  //   }

  //   return config;
  // },

  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },
};
