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
};
